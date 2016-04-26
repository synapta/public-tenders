# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class AbruzzoItem(scrapy.Item):
    ente = scrapy.Field()
    codice_fiscale = scrapy.Field()
    stazione_appaltante = scrapy.Field()
    indirizzo = scrapy.Field()
    cap = scrapy.Field()
    citta = scrapy.Field()
    provincia = scrapy.Field()
    telefono = scrapy.Field()
    fax = scrapy.Field()
    email = scrapy.Field()
    cig = scrapy.Field()
    cpv = scrapy.Field()
    oggetto = scrapy.Field()
    procedura_di_aggiudicazione = scrapy.Field()
    importo_complessivo = scrapy.Field()
    luogo_di_esecuzione = scrapy.Field()
    fonte = scrapy.Field()
    numero = scrapy.Field()
    pubblicato_in_data = scrapy.Field()
    data_pubblicazione = scrapy.Field()
    data_di_scadenza = scrapy.Field()
    bando = scrapy.Field()
    allegato = scrapy.Field()
