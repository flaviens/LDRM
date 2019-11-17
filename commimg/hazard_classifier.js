// first you need to install something
// npm install --save watson-developer-cloud

// Then you can classify the image
var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
var fs = require('fs');

var visualRecognition = new VisualRecognitionV3({
	version: '2019-11-17',
	iam_apikey: 'ThQOWETYg4cg7kpE-xTEfoHVbh627RxdDCNs5YrZxCAG'
});

var images_file= fs.createReadStream('./Test/yellow.jpg'); // Here you put in the picture
var classifier_ids = ["BuildingHazardClassifier_1958782173"];
var threshold = 0.6;

var params = {
	images_file: images_file,
	classifier_ids: classifier_ids,
	threshold: threshold
};

visualRecognition.classify(params, function(err, response) {
	if (err) { 
		console.log(err);
	} else {
		// console.log(JSON.stringify(response.images[0].classifiers[0].classes[0]))
	}
});