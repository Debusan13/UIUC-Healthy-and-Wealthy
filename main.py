import json
import requests as r
from requests import Response
from bs4 import BeautifulSoup
from bs4.element import Tag
from typing import List


s = r.Session()


def parse_param(string):
    return string[string.index('(') + 1:string.index(')')]


def get_dining_halls():
    res: Response = s.post("https://eatsmart.housing.illinois.edu/NetNutrition/46")
    soup = BeautifulSoup(res.content, features="html.parser")
    elements: List[Tag] = soup.find_all("td", class_="cbo_nn_sideUnitCell")

    result = {}
    for element in elements:
        link = list(element.children)[0]
        hall_name = link.text
        hall_id = parse_param(link['onclick'])
        result[hall_name] = hall_id
    return result

def get_hall_options(hall_id):
    res: Response = s.post("https://eatsmart.housing.illinois.edu/NetNutrition/46/Unit/SelectUnitFromChildUnitsList", data={
        'unitOid': hall_id
    })
    html = json.loads(res.content)['panels'][2]['html']
    soup = BeautifulSoup(html, features="html.parser")
    elements: List[Tag] = soup.find_all("td", class_="cbo_nn_childUnitsCell")
    result = {}
    for element in elements:
        link = list(element.children)[0]
        option_name = link.text
        option_id = parse_param(link['onclick'])
        result[option_name] = option_id
    return result


def get_option_days_menus(option_id):
    res: Response = s.post("https://eatsmart.housing.illinois.edu/NetNutrition/46/Unit/SelectUnitFromChildUnitsList", data={
        'unitOid': option_id
    })
    html = json.loads(res.content)['panels'][3]['html']
    soup = BeautifulSoup(html, features="html.parser")

    menu_table = list(soup.find_all("table", class_="cbo_nn_menuTable"))

    result = {}
    for menu_element in menu_table:
        for day_menus in menu_element.children:
            day = day_menus.select_one("tr > td > table > tr > td").text
            result[day] = {}
            time_periods = day_menus.select(".cbo_nn_menuLinkCell")
            for period in time_periods:
                period_name = list(period.children)[0].text
                menu_id = parse_param(list(period.children)[0]['onclick'])
                result[day][period_name] = menu_id
    return result


def get_menu(menu_id):
    res: Response = s.post("https://eatsmart.housing.illinois.edu/NetNutrition/46/Menu/SelectMenu", data={
        'menuOid': menu_id
    })
    html = json.loads(res.content)['panels'][0]['html']
    soup = BeautifulSoup(html, features="html.parser")

    table = soup.select_one('table.cbo_nn_itemGridTable')
    if table is None:
        return {}
    c = table.children
    
    result = {}
    for row in c:
        children = list(row.children)
        if len(children) == 4:
            result[children[1].text] = {}
    return result

with open('fuck.json', 'w') as f:
    f.write(json.dumps(all_data, indent=2))

# get_hall_options(1)
# get_option_days_menus(2)
# print(get_menu(1122722))

# hi Louis!!!!! :D Your computer is really nice to type in. I feel cool. 