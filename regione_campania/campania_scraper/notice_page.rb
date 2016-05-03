module CampaniaScraper
  class NoticePage
    def initialize(page_url)
      @scraper = Mechanize.new
      @url = page_url
    end

    def notice_urls
      @notice_urls ||= begin
        @scraper
          .get(@url)
          .search('.GR0_GridCol_Link a')
          .map { |a| a.attributes['href'].value }
          .uniq
          .map { |url| NoticeCompetition.new(url) }
      end
    end
  end
end
