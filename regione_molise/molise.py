# -*- coding: utf-8 -*-
"""
Copyright (C) 2016 Riccardo Magliocchetti <riccardo.magliocchetti@gmail.com>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
"""

import json
import re

import requests
from lxml.html import fromstring


PERIODO_PUBBLICAZIONE_RE = re.compile(r'dal (?P<dal>[0-9]+/[0-9]+/20[0-9][0-9])(<br />)?al (?P<al>[0-9]+/[0-9]+/20[0-9][0-9])')
CIG_RE = re.compile(r'(C\.I\.G\. n\.|CIG) (?P<cig>\w+)')
CUP_RE = re.compile(r'(C\.U\.P\. n\.|CUP) (?P<cup>\w+)')
RDO_RE = re.compile(r'(R\.D\.O\. n\.|RDO|RDO n.) (?P<rdo>\d+)')


def scrape_allegato_page(url):
    r = requests.get(url)
    html = fromstring(r.text)
    links = html.cssselect('#ColCent .Contenuti .viewLink')
    return [(link.text_content(), link.get('href')) for link in links]

def get_allegati(td):
    anchors = td.findall('a')
    allegati = []
    for a in anchors:
        href = a.get('href')
        if "AttachDownload" in href:
            allegati.append((a.text_content(), href))
        else:
            allegati += scrape_allegato_page(href)
    return allegati

def parse_periodo(periodo):
    pp = PERIODO_PUBBLICAZIONE_RE.search(periodo)
    return pp.group('dal'), pp.group('al')

def extract_cig_cups_rdo(oggetto):
    riferimenti = []
    cigs = CIG_RE.findall(oggetto)
    for cig in cigs:
        riferimenti.append(('CIG', cig[1]))
    cups = CUP_RE.findall(oggetto)
    for cup in cups:
        riferimenti.append(('CUP', cup[1]))
    rdos = RDO_RE.findall(oggetto)
    for rdo in rdos:
        riferimenti.append(('RDO', rdo[1]))
    return riferimenti

def clean_text_content(text):
    return re.sub('[\n\r]+', ' ', text)

def scrape_page(text):
    html = fromstring(text)
    trs = html.cssselect('#ColCent .Contenuti tbody tr')
    data = []
    for tr in trs:
        tds = tr.findall('td')
        pub_da, pub_a = parse_periodo(tds[0].text_content())
        id_atto = tds[1].text_content()
        tipologia = tds[2].text_content()
        oggetto = clean_text_content(tds[3].text_content())
        riferimenti = extract_cig_cups_rdo(oggetto)
        settore = tds[4].text_content()
        allegati = get_allegati(tds[5])

        row = {
            'pubblicazione_dal': pub_da,
            'pubblicazione_al': pub_a,
            'identificativo atto': id_atto,
            'tipologia': tipologia,
            'oggetto': oggetto,
            'riferimenti': riferimenti,
            'settore': settore,
            'allegati': allegati,
        }
        data.append(row)

    next_url = get_next_url(html)
    return data, next_url

def regione_molise_scrape():
    url = 'http://www3.regione.molise.it/flex/FixedPages/IT/BandiDiGara.php/L/IT'

    data = []
    while True:
        r = requests.get(url)
        bando, next_url = scrape_page(r.text)
        data.append(bando)
        if not next_url:
            break

    return data

def get_next_url(html):
    navs = html.cssselect('.FlexNavi span.NavActive')
    for nav in navs:
       if nav.text_content() == '>':
           return nav.find('a').get('href')
    return None

def re_tests():
    periodo_pubblicazione = 'dal 29/04/2016<br />al 30/06/2016'
    pp = PERIODO_PUBBLICAZIONE_RE.search(periodo_pubblicazione)
    assert pp.group('dal') == "29/04/2016"
    assert pp.group('al') == "30/06/2016"

    oggetto = "Affidamento della fornitura di n. 1 Laser ad Holmium Yag per l’UOC Urologia del P.O: “Cardarelli” di Campobasso – CIG 6597539D67, tramite Richiesta di Offerta sul Mercato Elettronico della P.A. (MEPA) - RDO n. 1129894"
    cig = CIG_RE.findall(oggetto)
    assert cig
    assert len(cig) == 1
    assert cig[0][1] == "6597539D67"
    rdo = RDO_RE.findall(oggetto)
    assert rdo
    assert len(rdo) == 1
    assert rdo[0][1] == "1129894"

    oggetto = """Indizione procedure negotiate per conto del comune di Vinchiaturo per i seguenti lavori, 1 - "Messa in sicurezza strade esterne al centro abitato" - CUP F94E15000210001 - CIG 654803161E - 2. "Intervento strutturale demolizione/ricostruzione dell'edificio sede della caserma dei carabinieri - CUP F97B14000330001 - CIG 657452802 - AGGIUDICAZIONE"""
    cigs = CIG_RE.findall(oggetto)
    assert cigs
    assert len(cigs) == 2
    assert cigs[0][1] == "654803161E"
    assert cigs[1][1] == "657452802"

    cups = CUP_RE.findall(oggetto)
    assert cups
    assert len(cups) == 2
    assert cups[0][1] == "F94E15000210001"
    assert cups[1][1] == "F97B14000330001"

    oggetto = clean_text_content("""C.I.G. n.\r\n6626872BC3""")
    riferimento = extract_cig_cups_rdo(oggetto)
    assert riferimento
    assert len(riferimento) == 1
    assert riferimento[0][0] == 'CIG'
    assert riferimento[0][1] == '6626872BC3'

if __name__ == '__main__':
    re_tests()
    data = regione_molise_scrape()
    with open('data.json', 'w+') as f:
        json.dump(data, f)
