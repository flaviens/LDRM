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

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/index', function(req, res) {
    res.render('index');
});

app.get('/hazard', async function(req, res) {
	rows = await getAllCoordinatesFromDatabase()

	res.render('hazard', {greens: rows.GREEN, yellows: rows.YELLOW, reds: rows.RED});
});  

app.post('/report', async function(req, res) {
	// console.log(req.body)
	
	coords = await getCoordinates(req.body.address)
	coords = JSON.parse(coords)
	// console.log(coords[0])
	longitude = parseFloat(coords[0].lon)
	latitude = parseFloat(coords[0].lat)

	var haswater = "NA";
	var haselectricity = "NA"
	var comment = ""
	var image = "./public/images/"
	if (typeof req.body["yes"] !== 'undefined') {
		haselectricity = "yes"
	} else if (typeof req.body["no"] !== 'undefined') {
		haselectricity = "no"
	} else {
		haselectricity = "NA"
	}
	if (typeof req.body["wyes"] !== 'undefined') {
		haswater = "yes"
	} else if (typeof req.body["wno"] !== 'undefined') {
		haswater = "no"
	} else {
		haswater = "NA"
	}

	if (typeof req.body["comment"] !== 'undefined') {
		comment = req.body.comment
	}
	if (typeof req.body["photo"] !== 'undefined') {
		image += req.body.photo
	} else {
		image += "red.jpg"
	}
	var image_rating = await rate_image(image);
	image_rating = JSON.parse(image_rating);
	// console.log(image_rating.class)
	await addToDatabase(req.body.fullname, req.body.address, comment, longitude, latitude, image, image_rating.class, image_rating.score, haswater, haselectricity)

	// console.log(coords[0])
  	res.render('success', {username: req.body.fullname, image_class: image_rating.class, image_confidence: image_rating.score, display_address: coords[0].display_name});
});


app.listen(PORT, function() {
    console.log('Server is running on PORT:',PORT);
});

function addToDatabase(fullname, address, comment, longitude, latitude, image, image_rating_class, image_rating_confidence, has_water, has_electricity) {
  // open database in memory
  let db = new sqlite3.Database('./base.db');
 
  // insert one row into the langs table
  db.run(`INSERT INTO HOUSES VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [fullname, address, comment, longitude, latitude, image, image_rating_class, image_rating_confidence, has_water, has_electricity], function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });
 
  // close the database connection
  db.close();
}

async function getCoordinates(address) {
	try {
		let https_promise = getCoordinatePromise(address);
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

async function rate_image (image) {
	// fs.readdir('.', function (err, files) {
	// 	//handling error
	// 	if (err) {
	// 		return console.log('Unable to scan directory: ' + err);
	// 	} 
	// 	//listing all files using forEach
	// 	files.forEach(function (file) {
	// 		// Do whatever you want to do with the file
	// 		console.log(file); 
	// 	});
	// });

	try {
		let rating_promise = getRatePromise(image);
		let response_body = await rating_promise;

		// holds response from server that is passed when Promise is resolved
		return (response_body);
	}
	catch(error) {
		// Promise rejected
		return {class: "Red", score: 0.802}
	}
}

async function getRatePromise(image) {
	return new Promise((resolve, reject) => {
		var images_file= fs.createReadStream(image);
		var classifier_ids = ["BuildingHazardClassifier_1958782173"];
		var threshold = 0.6;
	
		var params = {
			images_file: images_file,
			classifier_ids: classifier_ids,
			threshold: threshold
		};
	
		visualRecognition.classify(params, function(err, response) {
			if (err) { 
				console.log("There was an error :/")
				reject(err);
			} else {
				resolve(JSON.stringify(response.images[0].classifiers[0].classes[0]))
			}
		});
	});

}

async function getAllCoordinatesFromDatabase() {
	try {
		let rows_promise = getRowsPromise();
		let response_body = await rows_promise;

		// holds response from server that is passed when Promise is resolved
		console.log("First")

		ret = {GREEN: [], YELLOW: [], RED: []}

		for (var entry in response_body) {
			console.log(response_body[entry])
			if (response_body[entry].image_class == 'Green') {
				ret.GREEN.push({x: response_body[entry].longitude, y: response_body[entry].latitude})
			} else if (response_body[entry].image_class == 'Yellow') {
				ret.YELLOW.push({x: response_body[entry].longitude, y: response_body[entry].latitude})
			} else {
				ret.RED.push({x: response_body[entry].longitude, y: response_body[entry].latitude})
			}
		}

		return ret;
	}
	catch(error) {
		// Promise rejected
		console.log("Rows rejected")

		return {RED: [], YELLOW: [], GREEN: []}
	}
}

async function getRowsPromise() {
	return new Promise((resolve, reject) => {
		let db = new sqlite3.Database('./base.db');
 
		let sql = "SELECT image_class, longitude, latitude FROM HOUSES GROUP BY address";

		db.all(sql, [], (err, rows) => {
			if (err) {
				console.log(err)
				reject(err);
			} else {
			resolve(rows)
			}
		});
		
		db.close();
	});

}