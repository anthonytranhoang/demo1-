//let newYorkCoords = [40.73, -74.0059];
// let mapZoomLevel = 12;

// Create the createMap function.
function createMap(bikeStations) {

  // Create the tile layer that will be the background of our map.
  let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

  // Create a baseMaps object to hold the lightmap layer.
  let baseMaps = {
    "Street Map": streetmap
  };

  // Create an overlayMaps object to hold the bikeStations layer.
  let overlayMaps = {
    "Bike Stations": bikeStations
  };

  // Create the map object with options.
  let myMap = L.map("map-id",{
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [streetmap, bikeStations]
  });

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps,overlayMaps, {
    collapsed : false 
  }).addTo(myMap)
}

// Create the createMarkers function.
function createMarkers(response){

  // Pull the "stations" property from response.data.
  let station = response.data.stations;

  // Initialise an array to hold the bike markers.
  let bikeMarkers = [];

  // Loop through the stations array.
    // For each station, create a marker, and bind a popup with the station's name.
  for (let index = 0; index < station.length; index ++) {
    let station = station[index];
    // Add the marker to the bikeMarkers array.
    let bikeMarkers = L.marker([station.lat,station.lon])
      .bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "</h3>")
    
      bikeMarkers.push(bikeMarker);
  }
  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  createMap(L.layerGroup(bikeMarkers));
}
// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json").then(createMarkers);