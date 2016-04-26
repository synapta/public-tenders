var Xray = require('x-ray');
var x = Xray();

x('https://www.sitar-er.it/consultazione/riep_ag_fornserv.aspx?app_id=99183', 'table', [{
  denominazione: '#ctl00_cph_body_denom_ente',
  ufficio: '#ctl00_cph_body_ufficio',
  codice_fiscale: '#ctl00_cph_body_cf',
  indirizzo: '#ctl00_cph_body_indirizzo',
  cap: '#ctl00_cph_body_cap',
  citta: '#ctl00_cph_body_citta',
  telefono: '#ctl00_cph_body_telefono',

  appartenente_a: '#ctl00_cph_body_tipo_settore',
  descrizione: '#ctl00_cph_body_oggetto',
  tipologia_appalto: '#ctl00_cph_body_tipologia',
  affidamento_di_lotto: '#ctl00_cph_body_lotti',
  numero_del_lotto: '#ctl00_cph_body_num_lotto',
  cua: '#ctl00_cph_body_cua',
  cpv1: '#ctl00_cph_body_cpv1',
  cpv2: '#ctl00_cph_body_cpv2',
  cpv3: '#ctl00_cph_body_cpv3',
  responsabile_procedimento: '#ctl00_cph_body_rproc',
  cig: '#ctl00_cph_body_cig',
  cup: '#ctl00_cph_body_cup',
  luogo_consegna_o_prestazione_servizi: '#ctl00_cph_body_istat',
  importo_complessivo: '#ctl00_cph_body_imp_lav',
  importo_lotto: '#ctl00_cph_body_implav_lotto',
  importo_contrattuale: '#ctl00_cph_body_imp_contr',
  percentuale_ribasso_gara: '#ctl00_cph_body_perc_rib',
  procedura: '#ctl00_cph_body_proc_gara',
  ricorso_asta_elettronica: '#ctl00_cph_body_asta_elettr',
  forcella: '#ctl00_cph_body_forcella',
  appalto_riservato: '#ctl00_cph_body_app_ris',

  guce_bando: '#ctl00_cph_body_guce_esito',
  guri: '#ctl00_cph_body_guri',
  albo_pretorio: '#ctl00_cph_body_lbl_dataalpr',
  indirizzo_web: '#ctl00_cph_body_prof_comm',
  quotidiani_nazionali: '#ctl00_cph_body_lbl_nquotnaz',
  quotidiani_locali: '#ctl00_cph_body_lbl_nquotreg',

  guce_aggiudicazione: '#ctl00_cph_body_guce_esito',

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
