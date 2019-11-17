from watson_developer_cloud import VisualRecognitionV3

visual_recognition = VisualRecognitionV3(
    version='2016-05-17',
    iam_apikey="ThQOWETYg4cg7kpE-xTEfoHVbh627RxdDCNs5YrZxCAG"
)
import json
from watson_developer_cloud import VisualRecognitionV3

visual_recognition = VisualRecognitionV3(
    '2016-05-17',
    iam_apikey="ThQOWETYg4cg7kpE-xTEfoHVbh627RxdDCNs5YrZxCAG")

with open('C:/Users/Think/IBM/yellow.jpg', 'rb') as images_file:
    classes = visual_recognition.classify(
        images_file,
        threshold='0.6',
	classifier_ids='BuildingHazardClassifier_1958782173').get_result()
#print(json.dumps(classes, indent=2))
a = classes.get('images')[0].get('classifiers')[0].get('classes')