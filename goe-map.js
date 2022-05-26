/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 6,
    center: { lat: 40, lng: -4 },
  });
  // Load GeoJSON.
  map.data.loadGeoJson(
    "https://gorrthegod.github.io/goe/es_counties_simplify.json"
  );
  // Set the stroke width, and fill color for each polygon
  map.data.setStyle({
    fillColor: "green",
    strokeWeight: 1,
  });
  
// When the user hovers, tempt them to click by outlining the letters.
// Call revertStyle() to remove all overrides. This will use the style rules
// defined in the function passed to setStyle()
// set INFOBOX too
  map.data.addListener("mouseover", (event) => {
    document.getElementById("info-box").textContent = event.feature.getProperty("PROV") + " - " + event.feature.getProperty("COM") + " (" + event.feature.getProperty("COD_PROV_C") + ")" ;
  
    map.data.revertStyle();
    map.data.overrideStyle(event.feature, {strokeWeight: 3,fillColor:"RED"});
  
  });
  

map.data.addListener('mouseout', function(event) {
  map.data.revertStyle();
}); 
  
  var infowindow = new google.maps.InfoWindow();
                
  map.data.addListener('click', function(event) {
              let state =       event.feature.getProperty("PROV") + " - " + event.feature.getProperty("COM") + " (" + event.feature.getProperty("COD_PROV_C") + ")";
              let html = state; // combine state name with a label
              infowindow.setContent(html); // show the html variable in the infowindow
              infowindow.setPosition(event.latLng); // anchor the infowindow at the marker
              // infowindow.setOptions({pixelOffset: new google.maps.Size(0,-30)}); // move the infowindow up slightly to the top of the marker icon
              infowindow.open(map);
  });
  
  
  // Color each letter gray. Change the color when the isColorful property
// is set to true.
map.data.setStyle(function(feature) {
  var color = 'gray';
  if (feature.getProperty('isColorful')) {
    color = "red";
  }
  return /** @type {!google.maps.Data.StyleOptions} */({
    fillColor: color,
    strokeColor: color,
    strokeWeight: 1
  });
});

// When the user clicks, set 'isColorful', changing the color of the letters.
/** map.data.addListener('click', function(event) {
  event.feature.setProperty('isColorful', true);
}); **/

  
}

window.initMap = initMap;
