var myMap = L.map("map", {
  center: [39.1432892,-96.8211714,4.92], //[37.7749, -122.4194],
  zoom: 5
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);


var link = "static/csv/data.csv";
//var url = "https://data.sfgov.org/resource/cuks-n6tp.json?$limit=10000";

//d3.json(url, function(response) {
 d3.csv(link, function(response) {

  console.log(response);

  var heatArray = [];

  for (var i = 0; i < response.length; i++) {
    var location = response[i];

    if (location) {
      heatArray.push([location.lat, location.lon]);
      //console.log(heatArray[heatArray.length - 1]);
    }
  }

  var heat = L.heatLayer(heatArray, {
    maxZoom: 3,
    //minZoom:10,
    radius: 20,
    max: 2,
    blur: 6,
    gradient: {
      0.0:'blue',
      0.42: 'crimson',
      0.65: 'lime',
      1.0: 'red'
    }
  }).addTo(myMap);


});
function circleStyler (location) {
  var circleStyle = {};
  console.log("ff");
  console.log(location);
  var circleRadius = location.acres;
  var circleColor;
  var circleFillColor;
  if (location.cause === "Lightning") {
    circleColor = "blue"
    circleFillColor = "blue"
  } else if (location.cause === "Unknown") {
    circleColor = "gray"
    circleFillColor = "gray"
  }
  circleStyle = {radius: circleRadius,
                color: circleColor,
                fillColor: circleFillColor}
  return circleStyle
}
