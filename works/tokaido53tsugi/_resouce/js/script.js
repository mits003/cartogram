// MIERUNE MONO読み込み
const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/jp-mierune-streets/style.json?key=dF42KrAcf2PsiXFOc261',
    center: [139.75498, 35.68231],
    zoom: 14
});

// コントロール関係表示
map.addControl(new maplibregl.NavigationControl());

map.on('load', function () {
    map.addSource('stations', {
        "type": "geojson",
        "data": "../data/tokaido.geojson"
    });

    // map.addLayer({
    // 'id': 'stations',
    // 'type': 'circle',
    // 'source': 'stations',
    // 'paint': {
    // 'circle-radius': 8,
    // 'circle-stroke-width': 2,
    // 'circle-color': 'red',
    // 'circle-stroke-color': 'white'
    // }
    // });
});

const geojson = {
    "type": "FeatureCollection",
    "features": [
    { "type": "Feature", "properties": { "lon": 139.774444, "lat": 35.683611 }, "geometry": { "type": "Point", "coordinates": [ 139.774444, 35.683611 ] } },
    { "type": "Feature", "properties": { "lon": 139.739167, "lat": 35.621944 }, "geometry": { "type": "Point", "coordinates": [ 139.739167, 35.621944 ] } },
    { "type": "Feature", "properties": { "lon": 139.707778, "lat": 35.535556 }, "geometry": { "type": "Point", "coordinates": [ 139.707778, 35.535556 ] } },
    { "type": "Feature", "properties": { "lon": 139.632278, "lat": 35.472778 }, "geometry": { "type": "Point", "coordinates": [ 139.632278, 35.472778 ] } },
    { "type": "Feature", "properties": { "lon": 139.595556, "lat": 35.444028 }, "geometry": { "type": "Point", "coordinates": [ 139.595556, 35.444028 ] } },
    { "type": "Feature", "properties": { "lon": 139.529861, "lat": 35.395028 }, "geometry": { "type": "Point", "coordinates": [ 139.529861, 35.395028 ] } },
    { "type": "Feature", "properties": { "lon": 139.486306, "lat": 35.345667 }, "geometry": { "type": "Point", "coordinates": [ 139.486306, 35.345667 ] } },
    { "type": "Feature", "properties": { "lon": 139.337806, "lat": 35.327278 }, "geometry": { "type": "Point", "coordinates": [ 139.337806, 35.327278 ] } },]}

// Add markers to the map.
// add markers to map
geojson.features.forEach(function(marker) {

    // create a HTML element for each feature
    var el = document.createElement('div');
    el.className = 'marker';
  
    // make a marker for each feature and add to the map
    new maplibregl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .addTo(map);
  });