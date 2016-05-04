module CampaniaScraper
  class NoticePages
    def initialize(starting_url)
      @scraper = Mechanize.new
      @starting_url = starting_url
    end

    def list
      @list ||= begin
        urls.inject([]) do |array, url|
          array.push(NoticePage.new(url))
        end
      end
    end

    protected

    def urls
      @urls ||= begin
        @scraper
          .get(@starting_url)
          .search('#paginazione')
          .children
          .search('a')
          .map { |a| a.attributes['href'].value }
          .push(@starting_url)
          .uniq
      end
    end
  end
end
