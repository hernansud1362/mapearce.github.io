var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
		'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3hkMTQiLCJhIjoiY2pnZWkxdWI5MDZpMDJ6bWhvYnd1c2RpNiJ9.lqq6GL8K3sRK7wbLmYztAw';

var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
	streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr});




function getColor(d) {
return d > 0.98 ? '#800026' :
	   d > 0.88  ? '#BD0026' :
	   d > 0.70  ? '#E31A1C' :
	   d > 0.50  ? '#FC4E2A' :
	   d > 0.30   ? '#FD8D3C' :
	   d > 0.15   ? '#FEB24C' :
	   d > 0.05   ? '#FED976' :
				  '#FFEDA0';
}
//003454, 0C496D, 1D6185,337A9D,4E94B6,6DB1CE,92CEE6,BCEDFF




function style(feature) {
	return {
				fillColor: getColor(feature.properties.percentage),
				weight: 1,
				opacity: 1,
				color: 'white',
				dashArray: '3',
				fillOpacity: 0.7
			};
		}
		function style_flood(feature) {
			return {
						fillColor:'#20497e',
						weight: 0.2,
						opacity: 1,
						color: 'white',
						dashArray: '0',
						fillOpacity: 1
					};
				}
// risk map
var Flood_2070_100yr = L.layerGroup();
var base36100= L.geoJson(base36100, {
	style: style,
	onEachFeature: onEachFeature
}).addTo(Flood_2070_100yr);

var Flood_2070_10yr = L.layerGroup();
var base36010= L.geoJson(base36010, {
	style: style,
	onEachFeature: onEachFeature
}).addTo(Flood_2070_10yr);

var Flood_2030_100yr = L.layerGroup();
var base09100= L.geoJson(base09100, {
	style: style,
	onEachFeature: onEachFeature
}).addTo(Flood_2030_100yr);

var Flood_2030_10yr = L.layerGroup();
var base09010= L.geoJson(base09010, {
	style: style,
	onEachFeature: onEachFeature
}).addTo(Flood_2030_10yr);

var Flood_2050_100yr = L.layerGroup();
var base21100= L.geoJson(base21100, {
	style: style,
	onEachFeature: onEachFeature
}).addTo(Flood_2050_100yr);

var Flood_2050_10yr = L.layerGroup();
var base21010= L.geoJson(base21010, {
	style: style,
	onEachFeature: onEachFeature
}).addTo(Flood_2050_10yr);

// flood zones
var inter2070_100 = L.layerGroup();
var inter36100 = L.geoJson(inter36100,{style: style_flood}).addTo(inter2070_100);

var inter2070_10 = L.layerGroup();
var inter36010 = L.geoJson(inter36010,{style: style_flood}).addTo(inter2070_10);

var inter2050_100 = L.layerGroup();
var inter21100 = L.geoJson(inter21100,{style: style_flood}).addTo(inter2050_100);

var inter2050_10 = L.layerGroup();
var inter21010 = L.geoJson(inter21010,{style: style_flood}).addTo(inter2050_10);

var inter2030_100 = L.layerGroup();
var inter09100 = L.geoJson(inter09100,{style: style_flood}).addTo(inter2030_100);

var inter2030_10 = L.layerGroup();
var inter09010 = L.geoJson(inter09010,{style: style_flood}).addTo(inter2030_10);



var map = L.map('map', {
						center: [42.32,-71.06],
						zoom: 12,
						layers: [grayscale]
					});



var baseMaps = [
						{
							groupName : "Mapbox Base Maps",
							expanded : true,
							layers    : {
								"Grayscale": grayscale,
								"Streets": streets
							}
						}
];

var overlays = [
							 {
								groupName : "Flooding Zones",
 								expanded : true,
 								layers    : {
 									"2030: 10yr flood": inter2030_10,
 									"2030: 100yr flood": inter2030_100,
 									"2050: 10yr flood": inter2050_10,
 									"2050: 100yr flood": inter2050_100,
 									"2070: 10yr flood": inter2070_10,
 									"2070: 100yr flood": inter2070_100

								}
							 }, {
								 groupName : "Flood Risk Map",
 								expanded : true,
 								layers    : {
 									"2030: 10yr flood": Flood_2030_10yr,
 									"2030: 100yr flood": Flood_2030_100yr,
 									"2050: 10yr flood": Flood_2050_10yr,
 									"2050: 100yr flood": Flood_2050_100yr,
 									"2070: 10yr flood": Flood_2070_10yr,
 									"2070: 100yr flood": Flood_2070_100yr

								}
							 }
];


var options = {
				container_width 	: "200px",
				group_maxHeight     : "100px",
				container_maxHeight : "400px",
				exclusive       	: false,
				collapsed : true,
				position: 'topleft'
};

var control = L.Control.styledLayerControl(baseMaps, overlays, options);
map.addControl(control);

function highlightFeature(e) {
    var layer = e.target;
	//
    layer.setStyle({
        weight: 2,
        color: '#b2b2b2',
        dashArray: '',
        fillOpacity: 1});
	info.update(layer.feature.properties);


    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

function resetHighlight(e) {
    //geojson.resetStyle(e.target);
	var layer = e.target;
	layer.setStyle({
		weight: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.7});
	info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Boston Flood Risk</h4>' +  (props ?
        '<b>' +'Census Tract ID: '+ props.TRACTCE10 + '</b><br />' + 'Risk level: '+ Number(props.percentage.toFixed(3))
        : 'Choose a flood risk layer');
};

info.addTo(map);

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 0.05, 0.15, 0.30, 0.50, 0.70, 0.88],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] ) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '-1.00');
    }

    return div;
};

legend.addTo(map);
























//
