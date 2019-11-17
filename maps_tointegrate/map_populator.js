function GenerateLayerSet(points,setStyle)
{
    var markersArray=[];
    for(i=0;i<points.length;i++)
    {
        markersArray[i]=new ol.Feature({
          geometry: new ol.geom.Point(
            ol.proj.fromLonLat(points[i]),
          )
        });
    }
    var vectorSource = new ol.source.Vector({
        features: markersArray
        });
    var markersLayer = new ol.layer.Vector({
        source: vectorSource,
        style: setStyle
    });
    return markersLayer;
}
