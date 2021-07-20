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

    map.addLayer({
    'id': 'stations',
    'type': 'circle',
    'source': 'stations',
    'paint': {
    'circle-radius': 8,
    'circle-stroke-width': 2,
    'circle-color': 'red',
    'circle-stroke-color': 'white'
    }
    });
});
