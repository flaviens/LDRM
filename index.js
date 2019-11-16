var https = require('https');
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var hbs = require('express-hbs');
var path = require('path');
var querystring = require('querystring');

// const API_TOKEN = "AIzaSyACsj1e4lw8nymV4HjdI_LFPlk7SNIwaT4";
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
    res.end(coords);
    // res.render('index');
});

app.post('/report', function(req, res) {
  res.render('success', {username: req.body.fullname});
});

app.listen(PORT, function() {
    console.log('Server is running on PORT:',PORT);
});

function addToDatabase(fullname, address, ratingFromChatbot, image) {
  
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
	const params = {
		key: API_TOKEN,
		q: address,
		format: 'json'
	}
	const get_request_args = await querystring.stringify(params);
	const options = {
		url: "https://us1.locationiq.com",
		// port: 443,
		// headers : {
		// 		'Content-Type': 'application/x-www-form-urlencoded'
		// 	},
		path: "" + get_request_args,

	}
	console.log(options.path)
	return new Promise((resolve, reject) => {
		https.get("https://us1.locationiq.com/v1/search.php?"+get_request_args, (response) => {
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
