// parameters of basemap
const apiKey = 'dF42KrAcf2PsiXFOc261'
const mapTile = "https://api.maptiler.com/maps/jp-mierune-streets/{z}/{x}/{y}.png?key="
const attribution = '<a href="https://maptiler.jp/" target="_blank">© MIERUNE</a> <a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>'

let mapOptions = {
    center:[36.6, 138.5],
    zoom:5
};

let map = new L.map("map", mapOptions);

let basemap = new L.TileLayer(mapTile + apiKey, 
    {
    attribution: attribution
    });

map.addLayer(basemap);

let HeritagePoint = L.layerGroup().addTo(map);

let Map_AddLayer = {
    "World Heritage": HeritagePoint
};

// get the point from wikipedia
let url = "https://en.wikipedia.org/w/api.php";

let params = {
    action: "query",
    list: "categorymembers",
    cmtitle: "Category:World Heritage Sites in Japan",
    cmlimit:100,
    format: "json"
};

url = url + "?origin=*";
Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});


try {
    fetch(url)
        .then(function(response){return response.json();})
        .then(function(response) {
            let pages = response.query.categorymembers;
            for (var page in pages) {

                var page_params = {
                    action: "query",
                    prop: "coordinates",
                    titles: pages[page].title,
                    format: "json"
                };
                url = url + "?origin=*";
                Object.keys(page_params).forEach(function(key){url += "&" + key + "=" + page_params[key];});
                fetch(url)
                    .then(function(response){return response.json();})
                    .then(function(response) {
                        var pages = response.query.pages;
                        for (var page in pages) {
                            console.log(pages[page].title);
                            console.log("Latitute: " + pages[page].coordinates[0].lat);
                            console.log("Longitude: " + pages[page].coordinates[0].lon);
                            L.marker([pages[page].coordinates[0].lat, pages[page].coordinates[0].lon]).addTo(map);
                        }
                    })
                    .catch(function(error){console.log(error);});
            }
        });
    } catch (error) {
        console.log(error);
}
