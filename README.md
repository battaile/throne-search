# throne-search
Find old thronemaster games.

##Usage
```
var currentGameId = 37000;
```
**scrape all games to a text file**
```
for (var i = currentGameId; i > 0; i--){
	console.log('scraping ' + i);
	scrapeToFile(i);
}
```

**find most recent games matching a given winner and number of players**
```
for (var i = currentGameId; i > 0; i--){
	logIfMatch(i, 'Stark', 6);
}
```

##Requires
- cheerio.js
- request.js
