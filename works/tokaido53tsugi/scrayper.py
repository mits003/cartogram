import requests  # urllib.requestモジュールをインポート


from bs4 import BeautifulSoup  # BeautifulSoupクラスをインポート
import geopandas as gpd
import pandas as pd

# tokaido53tsugi
URL = "https://ja.wikipedia.org/wiki/%E6%9D%B1%E6%B5%B7%E9%81%93%E4%BA%94%E5%8D%81%E4%B8%89%E6%AC%A1"


def fetch_stations_coordinates() -> list:
    response = requests.get(URL)

    soup = BeautifulSoup(response.content, "html.parser")
    table = soup.find(class_="wikitable")
    coordinate_links = table.find_all(class_="plainlinks nourlexpansion")

    stations = []
    for coordinate_link in coordinate_links:
        coordinate_url = coordinate_link.find(
            class_="external text").get("href")
        response_coordinate = requests.get(coordinate_url)
        soup_coordinate = BeautifulSoup(response_coordinate.content, "html.parser")
        lat = soup_coordinate.find(class_="latitude p-latitude").text
        lon = soup_coordinate.find(class_="longitude p-longitude").text
        stations.append((float(lon), float(lat)))

    return stations


def export_geojson(stations):
    df = pd.DataFrame(stations, columns=['lon', 'lat'])
    gdf = gpd.GeoDataFrame(
        df, geometry=gpd.points_from_xy(df.lon, df.lat))

    print(gdf)
    filename = "./dist/data/tokaido.geojson"
    gdf.to_file(filename, driver='GeoJSON')


if __name__ == "__main__":
    stations = fetch_stations_coordinates()
    export_geojson(stations)
