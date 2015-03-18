var request = require("request");
var cheerio = require("cheerio");

function getPlayerCount(rows, $){
	var players = 0;

	for (var i = 3; i < rows.length; i++){
		var rowHtml = $(rows[i]).html();
		if (rowHtml.indexOf("PLANNING") > -1){ players++; }
		else {break; }
	}

	return players;
}

function scrape(id){
	var url = "http://game.thronemaster.net/?game=" + id + "&show=log";

	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);
			var rows = $("tr");
			
			var players = getPlayerCount(rows, $);

			var result = {playerCount: players};
			console.log(JSON.stringify(result));
			return result;
		}
	});
}

scrape(34249);
