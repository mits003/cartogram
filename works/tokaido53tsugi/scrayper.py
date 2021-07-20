import re
import requests  # urllib.requestモジュールをインポート


from bs4 import BeautifulSoup  # BeautifulSoupクラスをインポート
import geopandas as gpd
import pandas as pd

URL = "https://ja.wikipedia.org/wiki/%E6%9D%B1%E6%B5%B7%E9%81%93%E4%BA%94%E5%8D%81%E4%B8%89%E6%AC%A1"


def fetch_stations_coordinates():
    response = requests.get(URL)

    soup = BeautifulSoup(response.content, "html.parser")
    table = soup.find(class_="wikitable")
    coordinate_links = table.find_all(class_="plainlinks nourlexpansion")

    stations = []
    for coordinate_link in coordinate_links:
        coordinate_url = coordinate_link.find(
            class_="external text").get("href")
        coordinate_src = re.search(r"params=.*region", coordinate_url).group()
        coordinate = coordinate_src.replace(
            "params=", "").replace("region", "")
        lon_src = re.search(r"N.*E_", coordinate).group()
        lon_elems = lon_src.replace("N_", "").replace(
            "_E_", "").replace(".", "").split("_")
        lon = lon_elems[0] + "." + lon_elems[1] + lon_elems[2]

        lat_elems = coordinate.replace(lon_src, "").replace(".", "").split("_")
        lat = lat_elems[0] + "." + lat_elems[1] + lat_elems[2]

        stations.append((float(lon), float(lat)))

    print(stations)

    return stations


def export_geojson(stations):
    df = pd.DataFrame(stations, columns=['lon', 'lat'])

    gdf = gpd.GeoDataFrame(
        df, geometry=gpd.points_from_xy(df.lon, df.lat))

    print(gdf)
    filename = "tokaido.geojson"
    gdf.to_file(filename, driver='GeoJSON')


if __name__ == "__main__":
    stations = fetch_stations_coordinates()
    export_geojson(stations)
