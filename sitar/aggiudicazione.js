var Xray = require('x-ray');
var x = Xray();

x('https://www.sitar-er.it/consultazione/riep_ag_fornserv.aspx?app_id=99183', 'table', [{
  denominazione: '#ctl00_cph_body_denom_ente',
  ufficio: '#ctl00_cph_body_ufficio',

  data_offerta: '#ctl00_cph_body_offerta',

  data_aggiudicazione: '#ctl00_cph_body_data_aggiud',

  gara_n_richiedenti: '#ctl00_cph_body_n_imp_ric',
  gara_n_invitate: '#ctl00_cph_body_n_imp_inv',
  gara_n_offerenti: '#ctl00_cph_body_n_imp_off',
  gara_n_ammesse: '#ctl00_cph_body_n_imp_amm',

  tipologia_aggiudicatario: '#ctl00_cph_body_tipo_aggiud_affid',
  dati_aggiudicatario: '#ctl00_cph_body_aggiudicatario',
  nome_aggiudicatario: '#ctl00_cph_body_aggiudicatario strong',

  criterio_aggiudicazione: '#ctl00_cph_body_crit_aggiud',

  data_decorrenza_fornitura: '#ctl00_cph_body_eseclav',

  note: '#ctl00_cph_body_note',

  file_avviso_integrale: '#ctl00_cph_body_filename a@href',

  variazione_data: '#ctl00_cph_body_datavar',
  variazione_causale: '#ctl00_cph_body_causalevar',

  annullamento_data: '#ctl00_cph_body_dataannull',
  annullamento_causale: '#ctl00_cph_body_causaleannull'
}])
  .write('results.json')
