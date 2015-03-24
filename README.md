# throne-search
Find old thronemaster games.



var currentGameId = 37000;

for (var i = currentGameId; i > 0; i--){
	console.log('scraping ' + i);
	scrapeToFile(i);
}

for (var i = currentGameId; i > 0; i--){
	logIfMatch(i, 'Stark', 6);
}
