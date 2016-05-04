require 'mechanize'
require 'json'
require './campania_scraper/notice_pages.rb'
require './campania_scraper/notice_page.rb'
require './campania_scraper/notice_competition.rb'

module CampaniaScraper
  STARTING_URL = 'https://gare.regione.campania.it/portale/index.php/bandi?scaduti=yes&tipobando='
end

nps = CampaniaScraper::NoticePages.new(CampaniaScraper::STARTING_URL).list.inject([]) do |array, notice_page|
    notice_page.notice_urls.inject(array) do |array, notice_competition|
      array.push(notice_competition.to_hash)
    end
    array
  end

File.open("campania.json", "w") do |file|
  file.write nps.to_json
end
