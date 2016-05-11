var Nightmare = require('nightmare')
var nightmare = Nightmare({show: true})

nightmare
  .goto('https://appaltiliguria.regione.liguria.it/pubblica/cicloappalti/CicloappaltiServlet?trasparenza=si&codice_fiscale=&wpcommand=ricerca_veloce_appalti&sezione_orl=Consultazione+dati&tipo=GUEST&sezione_orl=&dest=motore_ricerca&apri_ricerca=ana&tipologia_ricerca=normale&m_stato_checked=1%2C2%2C3&m_procedura_checked=&tipoOrganizzazione_checked=&naturaGiuridica_checked=&m_soa_checked=&m_entrata_checked=&m_settore_checked=&m_tipologia_checked=F%2CL%2CS&m_modalita_checked=N%2CS%2CA&m_importo_checked=S%2CM%2CI&m_settore_contratto_checked=&m_amministrazioni_checked=&m_anno_checked=2015&divisione=&gruppo=&classe=&categoria=&sottocategoria=&tipologia=0&m_tipo=1&m_tipologia=F&m_tipologia=L&m_tipologia=S&m_modalita=N&m_modalita=S&m_modalita=A&m_importo=S&m_importo=M&m_importo=I&m_stato=1&m_stato=2&m_stato=3&cig=&oggetto=&importo_min_int=&importo_min_dec=&importo_max_int=&importo_max_dec=&m_anno=2015&m_provincie_checked=&m_comuni_checked=')
  // .inject('js', 'node_modules/jquery/dist/jquery.js')
  // //.type('input[title="Search"]', 'github nightmare')
  // .wait('.radios')
  // .mousedown('#tab1')
  // .wait('fieldset')
  // .evaluate(function () {
  //   return document.querySelector('fieldset').innerHTML
  // })

// var Nightmare = require('nightmare');
//   yield Nightmare()
  // .click('html body.bodySpaceNoScroll2.has-js form#idForm div.row.noborder fieldset.radios div.row.noborder table tbody tr td.testo_form label.label_radio')
  // .click('html body.bodySpaceNoScroll2.has-js form#idForm div.row.noborder fieldset.radios div.row.noborder table tbody tr td.testo_form label.label_radio.r_on input#tab1')

// var Nightmare = require('nightmare');
//   yield Nightmare()
    // .click('html body.bodySpaceNoScroll2.has-js div.ui-multiselect-menu.ui-widget.ui-widget-content.ui-corner-all div.ui-widget-header.ui-corner-all.ui-multiselect-header.ui-helper-clearfix ul.ui-helper-reset li a.ui-multiselect-all span')
    // .click('html body.bodySpaceNoScroll2.has-js form#idForm fieldset div.row.noborder table tbody tr td.testo_form')
    // .click('html body.bodySpaceNoScroll2.has-js div.ui-multiselect-menu.ui-widget.ui-widget-content.ui-corner-all div.ui-widget-header.ui-corner-all.ui-multiselect-header.ui-helper-clearfix ul.ui-helper-reset li a.ui-multiselect-all span')
    // .click('html body.bodySpaceNoScroll2.has-js form#idForm fieldset div.row.noborder table tbody tr td.testo_form')
    // .click('html body.bodySpaceNoScroll2.has-js div.ui-multiselect-menu.ui-widget.ui-widget-content.ui-corner-all div.ui-widget-header.ui-corner-all.ui-multiselect-header.ui-helper-clearfix ul.ui-helper-reset li a.ui-multiselect-all span')
    // .click('html body.bodySpaceNoScroll2.has-js form#idForm fieldset div.row.noborder table tbody tr td.testo_form')
    // .click('html body.bodySpaceNoScroll2.has-js div.ui-multiselect-menu.ui-widget.ui-widget-content.ui-corner-all div.ui-widget-header.ui-corner-all.ui-multiselect-header.ui-helper-clearfix ul.ui-helper-reset li a.ui-multiselect-all span')
    // .click('html body.bodySpaceNoScroll2.has-js form#idForm fieldset div.row.noborder table tbody tr td.testo_form')
    // .click('html body.bodySpaceNoScroll2.has-js div.ui-multiselect-menu.ui-widget.ui-widget-content.ui-corner-all.ui-multiselect-single ul.ui-multiselect-checkboxes.ui-helper-reset li label.ui-corner-all.ui-state-hover span')
    // .click('html body.bodySpaceNoScroll2.has-js div.ui-multiselect-menu.ui-widget.ui-widget-content.ui-corner-all.ui-multiselect-single ul.ui-multiselect-checkboxes.ui-helper-reset li label.ui-corner-all.ui-state-hover.ui-state-active input#ui-multiselect-m_anno-option-2')
    // .click('html body.bodySpaceNoScroll2.has-js form#idForm div.row.noborder div#div_row_bottoni_pagina.row.noborder div button#ricerca_normale.ui-button.ui-widget.ui-state-default.ui-corner-all.ui-button-text-only font')
    .click('#ricerca_normale')
  .then(function(result) {
    console.log(result)
  })

// nightmare.end()
