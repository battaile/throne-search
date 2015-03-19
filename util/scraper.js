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
		if ($(rows[i]).html().indexOf("wins this game of thrones") > -1 ) {
			var cells = $(rows[i]).find('td');
			var userCellHtml = $(cells[2]).text();
			var user = userCellHtml.substring(0, userCellHtml.indexOf(' '));
			return user;
		}
	}
	return '';
}

function getWinner(rows, $){
	var winningUser = getWinningUser(rows,$);
	if (winningUser === '') return '';
	
	for (var i = 3; i < rows.length; i++){
		var rowHtml = $(rows[i]).html();
		if (rowHtml.indexOf(winningUser) > -1){  
			var cells = $(rows[i]).find('td');
			var winnerCellHtml = $(cells[2]).text();
			var winner = winnerCellHtml.substring(0, winnerCellHtml.indexOf(' '));
			return winner;
		}
	}
	return '';
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

scrape(36177);
scrape(36573);

