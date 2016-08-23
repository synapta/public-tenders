var request = require("request");
var iconv  = require('iconv-lite');
var fs = require('fs');
var pdfUtil = require('pdf-to-text');
var MongoClient = require('mongodb').MongoClient;


function createConnection(onCreate){
  var db = MongoClient.connect('mongodb://127.0.0.1:27017/scp', function(err, db) {
    if(err)
        throw err;
    console.log("Connected to the mongoDB!");
    mongo_html = db.collection('html_file');
    mongo_pdf = db.collection('pdf_file');
    mongo_data = db.collection('data_file');

    onCreate();
  });
}

var parsePDF = function(path, data, callback) {
    pdfUtil.pdfToText(path, function(err, pdf) {
        if (err) throw(err);

        if(pdf.match(/CIG:.*/g))
            data["cig_bando"] = /CIG:[ ]*(.{10})/g.exec(pdf)[1];
        if(pdf.match(/CUP:.*/g))
            data["cup_bando"] = /CUP:[ ]*(.{15})/g.exec(pdf)[1];
        if(pdf.match(/CPV:.*/g))
            data["cpv_bando"] = /CPV:[ ]*(.{10})/g.exec(pdf)[1];
        callback(data);
    });
}

var parseSite = function(obj, data, cb) {
		data["denominazione"] = /Denominazione:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");
		data["codice_fiscale"] = /C.F.:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");

		data["tipo_settore"] = /Tipo di settore:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");
    if(obj.match(/Infrastruttura strategica:.*/g))
		    data["infrastruttura_strategica"] = /Infrastruttura strategica:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");
		data["mod_realizzazione"] = /Modalità di realizzazione:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");
		data["descrizione"] = /Descrizione: <\/span><b>([^<]*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");
		data["tipologia_intervento"] = /Tipologia intervento:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");
		data["responsabile_procedimento"] = /Responsabile del procedimento:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");
		data["luogo_lavori"] = /Luogo di esecuzione dei lavori:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");

		data["cig"] = /CIG:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");
		data["cup"] = /CUP:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");
		data["importo1"] = /Importo del lotto compresi gli oneri per la sicurezza \(IVA esclusa\):[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "").replace("&euro; ","");
		data["cpv1"] = /CPV1:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");
		data["cat_prevalente"] = /Categoria prevalente:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");
		data["classe"] = /Classe:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");

		data["importo_complessivo"] = /Importo complessivo a base di gara \(IVA esclusa\)<\/h2>[^\d]*([^<]*)/g.exec(obj)[1];

		data["procedura"] = /Procedura:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");
		data["asta_elettronica"] = /Ricorso all'asta elettronica:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");

    data["data_pub_GUUE"] = /Data pubblicazione sulla GUUE:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");
    data["data_pub_GURI"] = /Data pubblicazione sulla GURI:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");
    data["data_albo_pretorio"] = /Albo Pretorio :[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");
    data["profilo_committente"] = /Profilo di committente:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");

    data["data_termine_offerta"] = /Data termine richiesta di invito o presentazione offerta:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");

    data["gg_termine_prestazione"] = /numero giorni:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");

    if(obj.match(/\/PubbAvvisiBandiEsiti\/VisualizzaAllegato\.do\?/g)) {
        data["url_allegato"] = /\/PubbAvvisiBandiEsiti\/VisualizzaAllegato\.do\?.*&nr_doc=1/g.exec(obj)[0];
        var requestOptions  = {
          encoding: null,
          method: "GET",
          uri: "https://www.serviziocontrattipubblici.it" + data["url_allegato"]
        };
        request(requestOptions, function (error, response, body) {
            if (!error) {
                fs.writeFileSync("pdf", body); //XXX
                parsePDF("pdf", data, function(data) {
                    cb(data);
                });
                mongo_pdf.insert({id: data["id"], date: new Date().toISOString(), file: body});
            } else {
                console.log(error);
            }
        });
    } else {
        cb(data);
    }
}

var scrapeSCP = function(num, data, cb) {
    var requestOptions  = {
      encoding: null,
      method: "GET",
      uri: "https://www.serviziocontrattipubblici.it/PubbAvvisiBandiEsiti/GetScheda.do?codice=" + num + "&entita=BANDI_GARA"
    };
    request(requestOptions, function (error, response, body) {
        if (!error) {
            if (body.length > 8384) {
                var utf8String = iconv.decode(new Buffer(body), "ISO-8859-1");
                mongo_html.insert({id: num, date: new Date().toISOString(), file: utf8String});
                parseSite(utf8String, data, function (data) {
                    cb(data);
                });
            } else {
                console.log("skipped");
                cb(0);
            }
        } else {
            console.log(error);
        }
    });
}

const max = 133233;
var date = "";

function go(i) {
    var data = {};
    data["id"] = i;
    data["date"] = new Date().toISOString();
    console.log(">>> " + i);
    scrapeSCP(i, data, function (data) {
        if (data !== 0) {
            mongo_data.insert(data);
            console.log("saved!");
        }
        if (i < max) {
            setTimeout(function(){
                go(++i);
            }, 1200);
        } else {
            console.log("-------------");
            console.log("finish!");
        }
    });
}

createConnection(function(){
    go(133233);
});
