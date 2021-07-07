// MIERUNE MONO読み込み
const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/jp-mierune-streets/style.json?key={key}',
    center: [139.75498, 35.68231],
    zoom: 14
});

// コントロール関係表示
map.addControl(new maplibregl.NavigationControl());
