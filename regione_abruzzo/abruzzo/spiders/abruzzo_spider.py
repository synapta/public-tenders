"""scraper per l'abruzzo ;)."""
import scrapy

from abruzzo.items import AbruzzoItem


class AbruzzoSpider(scrapy.Spider):
    """Spider per l'abruzzo."""

    name = "abruzzo"
    allowed_domains = ["www.regione.abruzzo.it"]
    start_urls = [(
        "http://www.regione.abruzzo.it/xGare/index.asp?"
        "modello=ricercaBando&servizio=xList&stileDiv=mono"
        "&template=default&b=resultBa1&tom=n:-1:n:n:n:n:n:n:n"
    )]

    def parse(self, response):
        for elemento in response.css('#ricercaBando > .elemento'):
            href = elemento.css("div:nth-child(1) > a::attr('href')")
            url = response.urljoin(href.extract_first())
            print url

            request = scrapy.Request(url, callback=self.parse_dir_contents)
            yield request

    def parse_dir_contents(self, response):
        item = AbruzzoItem()

        item['ente'] = response.css("#schedaBando > div.sequence0 > div > div:nth-child(1)::text").extract_first()
        item['codice_fiscale'] = response.css("#schedaBando > div.sequence0 > div > div:nth-child(2)::text").extract_first()
        item['stazione_appaltante'] = response.css("#schedaBando > div.sequence0 > div > div:nth-child(3)::text").extract_first()
        item['indirizzo'] = response.css("#schedaBando > div.sequence0 > div > div:nth-child(4)::text").extract_first()
        item['cap'] = response.css("#schedaBando > div.sequence0 > div > div:nth-child(5)::text").extract_first()
        item['citta'] = response.css("#schedaBando > div.sequence0 > div > div:nth-child(6)::text").extract_first()
        item['provincia'] = response.css("#schedaBando > div.sequence0 > div > div:nth-child(7)::text").extract_first()
        item['telefono'] = response.css("#schedaBando > div.sequence0 > div > div:nth-child(8)::text").extract_first()
        item['fax'] = response.css("#schedaBando > div.sequence0 > div > div:nth-child(9)::text").extract_first()
        item['email'] = response.css("#schedaBando > div.sequence0 > div > div:nth-child(10)::text").extract_first()
        item['cig'] = response.css("#schedaBando > div.sequence1 > div > div:nth-child(1)::text").extract_first()
        item['cpv'] = response.css("#schedaBando > div.sequence1 > div > div:nth-child(2)::text").extract_first()
        item['oggetto'] = response.css("#schedaBando > div.sequence1 > div > div:nth-child(3)::text").extract_first()
        item['procedura_di_aggiudicazione'] = response.css("#schedaBando > div.sequence1 > div > div:nth-child(4)::text").extract_first()
        item['importo_complessivo'] = response.css("#schedaBando > div.sequence1 > div > div:nth-child(5)::text").extract_first()
        item['luogo_di_esecuzione'] = response.css("#schedaBando > div.sequence1 > div > div:nth-child(6)::text").extract_first()
        item['fonte'] = response.css("#schedaBando > div.sequence2 > div > div:nth-child(1)::text").extract_first()
        item['numero'] = response.css("#schedaBando > div.sequence2 > div > div:nth-child(2)::text").extract_first()
        item['pubblicato_in_data'] = response.css("#schedaBando > div.sequence2 > div > div:nth-child(3)::text").extract_first()
        item['data_pubblicazione'] = response.css("#schedaBando > div.sequence3 > div > div:nth-child(1)::text").extract_first()
        item['data_di_scadenza'] = response.css("#schedaBando > div.sequence3 > div > div:nth-child(2)::text").extract_first()
        item['bando'] = response.urljoin(response.css("#schedaBando > div.sequence6 > div > h4 > a").extract_first())
        item['allegato'] = response.urljoin(response.css("#schedaBando > div.sequence7 > div > h4 > a").extract_first())
        yield item
