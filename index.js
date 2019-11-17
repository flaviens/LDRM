var https = require('https');
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var hbs = require('express-hbs');
var path = require('path');
var querystring = require('querystring');
const sqlite3 = require('sqlite3').verbose();
var fs = require('fs');

var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');

var visualRecognition = new VisualRecognitionV3({
	version: '2019-11-17',
	iam_apikey: 'ThQOWETYg4cg7kpE-xTEfoHVbh627RxdDCNs5YrZxCAG'
});

// For the image classifier
var classifier_ids = ["BuildingHazardClassifier_1958782173"];
var threshold = 0.6;


const API_TOKEN = "9679aac1707833";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, '/public')));
var PORT = 8080;

app.get('/', async function(req, res) {
    const coords = await getCoordinates();
    // res.end(coords);
    res.render('index');
});

app.get('/index', async function(req, res) {
    const coords = await getCoordinates();
    // res.end(coords);
    res.render('index');
});

app.get('/hazard', function(req, res) {
	res.render('hazard', {coordinates: {RED: [], YELLOW: [], GREEN: []}});
});  

app.post('/report', function(req, res) {
	console.log(req.body)
  res.render('success', {username: req.body.fullname});
});



app.listen(PORT, function() {
    console.log('Server is running on PORT:',PORT);
});

function addToDatabase(fullname, address, ratingFromChatbot, image) {
  // open database in memory
	let db = new sqlite3.Database(':memory:', (err) => {
		if (err) {
		return console.error(err.message);
		}
		console.log('Connected to the in-memory SQlite database.');
	});
	
	// close the database connection
	db.close((err) => {
		if (err) {
		return console.error(err.message);
		}
		console.log('Close the database connection.');
	});
}

function getAllCoordinatesFromDatabase() {
  
}

async function getCoordinates() {
	try {
		let https_promise = getCoordinatePromise("Empire State Building");
		let response_body = await https_promise;

		// holds response from server that is passed when Promise is resolved
		return (response_body);
	}
	catch(error) {
		// Promise rejected
		return "Failed"
	}
}

async function getCoordinatePromise(address) {
	// const params = {
	// 	key: API_TOKEN,
	// 	q: address,
	// 	format: 'json'
	// }
	// const get_request_args = await querystring.stringify(params);
	// const options = {
	// 	url: "https://eu1.locationiq.com",
	// 	// port: 443,
	// 	// headers : {
	// 	// 		'Content-Type': 'application/x-www-form-urlencoded'
	// 	// 	},
	// 	path: "" + get_request_args,

	// }
	// console.log(options.path)
	return new Promise((resolve, reject) => {
		https.get("https://eu1.locationiq.com/v1/search.php?"+get_request_args, (response) => {
			let chunks_of_data = [];

			response.on('data', (fragments) => {
				chunks_of_data.push(fragments);
			});

			response.on('end', () => {
				let response_body = Buffer.concat(chunks_of_data);
				resolve(response_body.toString());
			});

			response.on('error', (error) => {
				reject(error);
			});
		});
	});
}
