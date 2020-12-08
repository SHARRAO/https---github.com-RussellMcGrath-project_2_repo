// Creating map object
var myMap = L.map("map", {
  center: [39.1432892,-96.8211714,4.92],
  zoom: 5
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v9", //streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Load in  data from csv
var link = "static/csv/data.csv";

var linkdata;

// Grab data with d3
d3.csv(link, function(data) {
  console.log(data);

  d3.json("us-states.js", function(data) {
    var dataArray = [];
    for (var d = 0; d < data.length; d++) {
      dataArray.push(parseFloat(data[d].acres))
    }
    var minVal = d3.min(dataArray)
    var maxVal = d3.max(dataArray)
    var ramp = d3.scaleLinear().domain([minVal,maxVal]).range([lowColor,highColor])
    console.log("dataArray:");
    console.log(dataArray);
    // Load GeoJSON data and merge with states data
    d3.json("us-states.js", function(json) {
  
      // Loop through each state data value in the .csv file
      for (var i = 0; i < data.length; i++) {
  
        // Grab State Name
        var dataState = data[i].state;
  
        // Grab data value 
        var dataValue = data[i].value;
  
        // Find the corresponding state inside the GeoJSON
        for (var j = 0; j < json.features.length; j++) {
          var jsonState = json.features[j].properties.name;
  
          if (dataState == jsonState) {
  
            // Copy the data value into the JSON
            json.features[j].properties.value = dataValue;
  
            // Stop looking through the JSON
            break;
          }
        }
      }
    });
  // Create a new choropleth layer
  //linkdata = L.choropleth(response, {

    // Define what  property in the features to use
    //valueProperty: "acres",

    // Set color scale
    //scale: ["#ffffb2", "#b10026"],

    // Number of breaks in step range
    //steps: 10,

    // q for quartile, e for equidistant, k for k-means
    //mode: "q",
    //style: {
      // Border color
      //color: "#fff",
      //weight: 1,
      //fillOpacity: 0.8
    //},

    // Binding a pop-up to each layer
    //onEachFeature: function(feature, layer) {
    //  layer.bindPopup("Zip Code: " + feature.properties.ZIP + "<br>Acres burned:<br>" +
    //    "$" + feature.properties.MHI2016);
   // }
  }); //.addTo(myMap);

  // Set up the legend
  /*var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = linkdata.options.limits;
    var colors = linkdata.options.colors;
    var labels = [];

    // Add min & max
    var legendInfo = "<h1>Median Income</h1>" +
      "<div class=\"labels\">" +
        "<div class=\"min\">" + limits[0] + "</div>" +
        "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });
  
    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding legend to the map
  legend.addTo(myMap);
*/
});
