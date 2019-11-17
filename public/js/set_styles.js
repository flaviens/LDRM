const redStyle =new ol.style.Style({
    image: new ol.style.Circle({
        radius: 2,
        fill: new ol.style.Fill({
            color: 'red'
        }),
        stroke: new ol.style.Stroke({
            color: 'red',
            width: 3
        })
    })
});
const greenStyle =new ol.style.Style({
    image: new ol.style.Circle({
        radius: 2,
        fill: new ol.style.Fill({
            color: 'green'
        }),
        stroke: new ol.style.Stroke({
            color: 'green',
            width: 3
        })
    })
});
const yellowStyle =new ol.style.Style({
    image: new ol.style.Circle({
        radius: 2,
        fill: new ol.style.Fill({
            color: 'yellow'
         }),
        stroke: new ol.style.Stroke({
            color: 'yellow',
            width: 3
        })
    })
});