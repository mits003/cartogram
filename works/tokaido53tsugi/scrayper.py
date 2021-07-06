import re
import requests  # urllib.requestモジュールをインポート
from bs4 import BeautifulSoup  # BeautifulSoupクラスをインポート

url = "https://ja.wikipedia.org/wiki/%E6%9D%B1%E6%B5%B7%E9%81%93%E4%BA%94%E5%8D%81%E4%B8%89%E6%AC%A1"
response = requests.get(url)

soup = BeautifulSoup(response.content, "html.parser")
table = soup.find(class_="wikitable")
coordinate_links = table.find_all(class_="plainlinks nourlexpansion")
for coordinate_link in coordinate_links:
    coordinate_url = coordinate_link.find(class_="external text").get("href")
    coordinate_src = re.search(r"params=.*region", coordinate_url).group()
    coordinate = coordinate_src.replace("params=", "").replace("region", "")
    lon_src = re.search(r"N.*E_", coordinate).group()
    lon_elems = lon_src.replace("N_", "").replace("_E_", "").replace(".", "").split("_")
    lon = lon_elems[0] + "." + lon_elems[1] + lon_elems[2]
    print(lon)

    lat_elems = coordinate.replace(lon_src, "").replace(".", "").split("_")
    lat = lat_elems[0] + "." + lat_elems[1] + lat_elems[2]
    print(lat)
