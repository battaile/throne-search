var request = require("request");
var cheerio = require("cheerio");


function scrape(id){
	var url = "http://game.thronemaster.net/?game=" + id + "&show=log";

	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);
			console.log(html);
		}
	});
}

scrape(30000);
