var request = require("request");
var cheerio = require("cheerio");


function scrape(id){
	var url = "http://game.thronemaster.net/?game=" + id + "&show=log";

	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);
			var rows = $("tr");
			var players = 0;


			for (var i = 3; i < rows.length; i++){
				var rowHtml = $(rows[i]).html();
				
				if (rowHtml.indexOf("PLANNING") > -1){ players++; }
				else {break; }
			}
			console.log("Players: " + players);
		}
	});
}

scrape(34249);
