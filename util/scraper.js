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

function getWinningUser(rows, $){
	// more efficient to start at the end
	for (var i = rows.length - 1; i >= 0; i--){
		if ($(rows[i]).html().indexOf("GAME END") > -1 ) {
			var cells = $(rows[i]).find('td');
			return $(cells[3]).text();
		}
	}
	return '';
}

function getWinner(rows, $){
	var winningUser = getWinningUser(rows,$);

}

function process(result){
	console.log(result);
}

function scrape(id){
	var url = "http://game.thronemaster.net/?game=" + id + "&show=log";
	var result;
	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);
			var rows = $("tr");

			var playerCount = getPlayerCount(rows, $);
			var winner = getWinner(rows,$);
			result = {finished: (winner != ''), playerCount: playerCount, winner: winner};
			process(result);
		}
	});
}

scrape(35791);

