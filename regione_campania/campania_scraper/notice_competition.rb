module CampaniaScraper
  class NoticeCompetition
    def initialize(url)
      @scraper = Mechanize.new
      @url = url
    end

    def to_hash
      %w{descrizione_breve cig ufficio_proponente responsabile_procedure_gara
        importo_complessivo_appaltocriterio_aggiudicazione
        criterio_formulazione_offerta_economica tipo_appalto
        presentare_domande_offerte_entro_il termine_entro_cui_presentare_quesiti
      }.each_with_index.inject({}) do |hash, (key, index)|
        hash.merge!("#{key}": fields[index]
          .children
          .reject { |node| node.is_a? Nokogiri::XML::Comment }
          .map{ |node| node.to_s.gsub(%r{\n|\r|\t},' ') }
          .join(' ')
          .strip)
      end
    end

    protected

    def fields
      @fields ||= @scraper.get(@url).search('#template_doc tbody tr td')
    end
  end
end
