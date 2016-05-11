# Regione Liguria

Lo scraping del sito della regione Liguria è stato effettuato contemporaneamente su due fronti: uno ha portato know-how su tecnologie sconosciute al team, l'altro ha portato risultati concreti.

## Scraping JavaScript

Una volta appurato che x-ray è troppo terra-terra per poter effettuare interazioni con la pagina, e scartata anche l'opzione x-ray-phantom in quanto è praticamente la stessa cosa ma con un motore diverso, ci siamo imbattuti in nightmare: questo si appoggia su phantomjs ma è una libreria di più alto livello e quindi più facile da utilizzare.

Sull'onda di nightmare ci siamo imbattuti anche nell'estensione per Chromium chiamata daydream, che registra le interazioni sulla pagina generando automaticamente script per nightmare.

Purtroppo il sito della regione Liguria, basato su frameset e chiamate a un'unica servlet che ricarica la pagina a ogni interazione, ci ha costretti a rinunciare a questo approccio.

## Sniffing chiamate HTTP

Parallelamente è stato tentato l'approccio di tracciare le chiamate alla servlet per arrivare a un risultato finale. La serie di chiamate è definita nel file Regione_Liguria.json.postman_collection (da aprire con Postman), nel quale sono presenti due chiamate in POST per avanzare nella form di selezione dei parametri di ricerca, una GET da chiamare più volte per conoscere lo stato di avanzamento della query, e una POST finale da eseguire al completamento per ottenere un gigantesco JSON con tutti i risultati.

Purtroppo non ricordo i nomi degli altri contributori, eccettuato Orlando Selenu.

Over and out,
[Antony Mistretta](https://www.linkedin.com/in/antonymistretta), aka [IceOnFire](https://github.com/IceOnFire)
http://www.ingloriouscoderz.it
