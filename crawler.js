var Crawler = require("crawler").Crawler;

var Db = require('mysql-activerecord');
var db = new Db.Adapter({
  server: 'localhost',
  username: 'root',
  password: '',
  database: 'crawl'
});

var crawler = new Crawler({
  "maxConnections": 10,
  "callback": function (error, result, $){
    if (error) {
      return;
    }
    debugger
    db.insert_ignore('pages', {
        body: result.body,
        url: result.uri
      }
    );

    $("a").each(function (index, a){
      crawler.queue(a.href);
    });
  }
});

crawler.queue("http://pandorajodqp5zrr.onion");