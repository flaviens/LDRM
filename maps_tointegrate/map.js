
  var baseMapLayer = new ol.layer.Tile({
    source: new ol.source.OSM()
  });

  var map = new ol.Map({
    target: 'map',
    layers: [ baseMapLayer],
    view: new ol.View({
            center: ol.proj.fromLonLat([8.508956,47.409098]), 
            zoom: 13 //Initial Zoom Level
          })
  });

  var markerSets={}
  function LoadMarkerSet(markerData,tag,style)
  {
      var points=[]
      for(i=0;i<markerData.length;i++)
      {
          points[i]=[markerData[i].x,markerData[i].y];
      }   
      markerSets[tag]=GenerateLayerSet(points,style);
  }

  function DisplayMarkerSet(tag)
  {
    map.addLayer(markerSets[tag]);
  }

  function HideMarkerSet(tag)
  {
    map.removeLayer(markerSets[tag]);
  }
