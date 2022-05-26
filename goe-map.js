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
  
  // Set mouseover event for each feature.
  map.data.addListener("mouseover", (event) => {
    document.getElementById("info-box").textContent =
      event.feature.getProperty("PROV") + " - " + event.feature.getProperty("COM") + " (" + event.feature.getProperty("COD_PROV_C") + ")" ;
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
  
  
}

window.initMap = initMap;
