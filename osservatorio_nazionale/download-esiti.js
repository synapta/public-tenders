var request = require("request");
var iconv  = require('iconv-lite');
var fs = require('fs');
var pdfUtil = require('pdf-to-text');
var MongoClient = require('mongodb').MongoClient;


function createConnection(onCreate){
  var db = MongoClient.connect('mongodb://127.0.0.1:27017/scp-esiti', function(err, db) {
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
        if (err) {
            console.log(err);
        } else {
            if(pdf.match(/CIG:.*/g))
                data["cig_esito"] = /CIG:[ ]*(.{10})/g.exec(pdf)[1];
            if(pdf.match(/CUP:.*/g))
                data["cup_esito"] = /CUP:[ ]*(.{15})/g.exec(pdf)[1];
            if(pdf.match(/CPV:.*/g))
                data["cpv_esito"] = /CPV:[ ]*(.{10})/g.exec(pdf)[1];
            callback(data);
        }
    });
}

var parseSite = function(obj, data, cb) {
		data["denominazione"] = /Denominazione:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");
		data["codice_fiscale"] = /C.F.:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");

    data["tipologia_appalto"] = /Tipologia appalto:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");
		data["tipo_settore"] = /Tipo di settore:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");
    if(obj.match(/Infrastruttura strategica:.*/g))
		    data["infrastruttura_strategica"] = /Infrastruttura strategica:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");
    if(obj.match(/Modalità di realizzazione:.*/g))
		    data["mod_realizzazione"] = /Modalità di realizzazione:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");
		data["descrizione"] = /Descrizione: <\/span><b>([^<]*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");
    if(obj.match(/Tipologia intervento:.*/g))
		    data["tipologia_intervento"] = /Tipologia intervento:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");
    data["cpv1"] = /CPV1:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");

    data["cat_prevalente"] = /Categoria prevalente:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");

    data["responsabile_procedimento"] = /Rup:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");

    data["cup"] = /CUP:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");

    data["cig"] = /CIG:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");

    data["luogo_lavori"] = /Luogo di esecuzione<\/h2>\r\n\t\t\t<\/div>\r\n\t\t\t<b>([^<]*)/g.exec(obj)[1];

    data["importo_base_gara"] = /Importo complessivo a base di gara \(IVA esclusa\)<\/span><br>\r\n\t\t\t<b>(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "").replace("&euro; ","");
    data["importo_contratto"] = /Importo contrattuale \(IVA esclusa\)<\/span><br>\r\n\t\t\t<b>(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "").replace("&euro; ","");
    data["perc_riba_win"] = /Percentuale di ribasso di gara dell'offerta aggiudicataria<\/span><br>\r\n\t\t\t<b>(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");

		data["procedura"] = /Procedura d'aggiudicazione<\/h2>\r\n\t\t\t<\/div>\r\n\t\t\t<b>(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");
		data["asta_elettronica"] = /Ricorso all'asta elettronica:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");

    data["data_pub_GUUE"] = /Data pubblicazione sulla GUUE:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");
    data["data_pub_GURI"] = /Gazzetta Ufficiale Repubblica Italiana - GURI:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");
    data["data_albo_pretorio"] = /Albo pretorio:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");
    data["profilo_committente"] = /Profilo di committente:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");

    data["data_termine_offerta"] = /Data entro cui le imprese dovevano presentare offerta:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");
    data["data_aggiudicazione"] = /Data di aggiudicazione definitiva:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");

    data["n_richiedenti"] = /N\. imprese richiedenti:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");
    data["n_invitate"] = /N\. imprese invitate:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");
    data["n_offerenti"] = /N\. imprese offerenti:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");
    data["n_ammesse"] = /N\. imprese ammesse:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");

    if (/Aggiudicatario<\/h2>\r\n\t\t\t<\/div>\r\n\t\t\t\r\n\t\t\t\t<UL class="link_plus_no_indent">\r\n\t\t\t\t\t<LI>\r\n\t\t\t\t\t\t<b>(.*)/g.exec(obj) !== null)
        data["aggiudicatario"] = /Aggiudicatario<\/h2>\r\n\t\t\t<\/div>\r\n\t\t\t\r\n\t\t\t\t<UL class="link_plus_no_indent">\r\n\t\t\t\t\t<LI>\r\n\t\t\t\t\t\t<b>(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");

    data["criterio_win"] = /Criteri di aggiudicazione<\/h2>\r\n\t\t\t<\/div>\r\n\t\t\t<b>(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");

    if(obj.match(/numero giorni:.*/g))
        data["gg_termine_prestazione"] = /numero giorni:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");
    if(obj.match(/data presunta di fine lavori:.*/g))
        data["data_presunta_fine_lavori"] = /data presunta di fine lavori:[ ]*(.*)/g.exec(obj)[1].replace(/<\/?[^>]+(>|$)/g, "");

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
      uri: "https://www.serviziocontrattipubblici.it/PubbAvvisiBandiEsiti/GetScheda.do?codice=" + num + "&entita=ESITI"
    };
    request(requestOptions, function (error, response, body) {
        if (!error) {
            if (body.length > 9000) {
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

const max = 1619;
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
    go(1619);
});
