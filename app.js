/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');


// Twitter
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

// Watson
var watson = require('watson-developer-cloud');

var natural_language_classifier = watson.natural_language_classifier({
	url: 'https://gateway.watsonplatform.net/natural-language-classifier/api',
	username: process.env.NLP_USER,
	password: process.env.NLP_PASS,
	version: 'v1'
});

// Alchemy Language
var alchemy_language = watson.alchemy_language({
	  api_key: process.env.ALCHEMY_API
});

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

app.get('/test', function (req, res) {
  res.send({user:req.param('userid')});
});

app.get('/watson', function (req, res) {
	tweet_storage = {"total": 0, "positive": 0, "negative": 0, "neutral": 0}
	
	var return_results = function (output) {
		res.send(output)
	}

	var output = function (results, total_number) {
		console.log(results);
		tweet_storage["total"] += 1;
		tweet_storage[results["type"]] += 1;
		if (tweet_storage["total"] == total_number) {
			console.log(tweet_storage);
			return_results(tweet_storage);
		}
	};

	var params = {screen_name: req.param('userid')};
	client.get('statuses/user_timeline', params, function(error, tweets, response){
	if (!error) {
		for (var i = 0; i < tweets.length; i++) {
			alchemy_language.sentiment({"text": tweets[i]["text"]}, function (err, response) {
			  if (err)
			    console.log('error:', err);
			  else
			    output(response["docSentiment"], tweets.length);
			}); 
		}
	} else {
		console.log(error);
		res.send('Something went horrible wrong, I blame solar flares.');
	}
	});
});
