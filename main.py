import json
import requests as r
from requests import Response
from bs4 import BeautifulSoup
from bs4.element import Tag
from typing import List

def get_targets(data):
    daily_cal = 0
    bmr = 0
    protien = 0

    if int(data['sex']) == 1 : #male
        height = (int(data['height_ft']) * 12) + int(data['height_in'])
        bmr = 66 + (6.3*int(data['weight'])) + (12.9 * height) - (6.8 * int(data['age']))

    if int(data['sex']) == 2 : #female
        height = (int(data['height_ft']) * 12) + int(data['height_in'])
        bmr = 655 + (4.3*int(data['weight'])) + (4.7 * height) - (4.7 * int(data['age']))
        
    if int(data['activity_level']) == 1:
        daily_cal = int(bmr*1.2)
        protien = int((int(data['weight']) / 2.2) * .5)
    elif int(data['activity_level']) == 2:
        daily_cal = int(bmr*1.2)
        protien = int((int(data['weight']) / 2.2) * .8)
    elif int(data['activity_level']) == 3:
        daily_cal = int(bmr*1.2)
        protien = int((int(data['weight']) / 2.2) * 1.2)
    elif int(data['activity_level']) == 4:
        daily_cal = int(bmr*1.2)
        protien = int((int(data['weight']) / 2.2) * 1.5)
    elif int(data['activity_level']) == 5:
        daily_cal = int(bmr*1.2)
        protien = int((int(data['weight']) / 2.2) * 1.7)
        
    if int(data['goal']) == 1:
        daily_cal = int(daily_cal*1.2)
    if int(data['goal']) == 2:
        daily_cal = int(daily_cal*.8)

    fat = int(daily_cal * .3 / 9)


    targets = {
        'daily_cal' : daily_cal,
        'protien' : protien,
        'sugar' : 30,
        'fat' : fat,
        'cholesterol' : 200
    }
    return targets

s = r.Session()


def parse_param(string):
    return string[string.index('(') + 1:string.index(')')]


def clean(string):
    return string.replace(u'\xa0', u' ')


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
            js = children[0].select_one('td > input')
            if js is not None:
                js_code = js['onclick']
                food_id = js_code[js_code.index(',') + 2:js_code.index(')')]
                result[children[1].text] = {'food_id': food_id}
    return result

def get_nutritional_info(food_id):
    res: Response = s.post("https://eatsmart.housing.illinois.edu/NetNutrition/46/NutritionDetail/ShowItemNutritionLabel", data={
        'detailOid': food_id
    })
    soup = BeautifulSoup(res.content, features="html.parser")

    result = {}

    table = soup.select_one('.cbo_nn_NutritionLabelTable')
    children = list(table.children)

    calories = children[4].select_one('tr > td > table > tr > td')
    if calories is not None:
        result['Calories'] = clean(list(calories.children)[2].text)
    
    for child in children[6:-3]:
        container = child.select_one('tr > td > table > tr > td > table > tr')
        if container is None:
            continue
        items = list(container.children)
        category_name = items[0].select_one('td > span').text
        # print(category_name)
        units = items[1].select_one('td > span').text
        # print(units)
        result[clean(category_name)] = clean(units).strip()
    serving_size = clean(children[2].select_one('tr > td').text)
    prefix = 'Serving Size: '
    result['Serving Size'] = serving_size[serving_size.index(prefix) + len(prefix):]
    return result


def scrape_api():
    hall_data = {}
    i = 0
    dining_halls = get_dining_halls()
    for hall_name, hall_id in dining_halls.items():
        hall_data[hall_name] = {}
        options = get_hall_options(hall_id)
        for option_name, option_id in options.items():
            # all_data[hall_name][option_name] = {}
            days_menus = get_option_days_menus(option_id)
            for day, periods in days_menus.items():
                # all_data[hall_name][option_name][day] = {}
                for period_name, menu_id in periods.items():
                    # all_data[hall_name][option_name][day][period_name] = {}
                    menu = get_menu(menu_id)
                    for menu_item_name, data in menu.items():
                        if i % 100 == 0:
                            print(i)
                        hall_data[hall_name][menu_item_name] = get_nutritional_info(data['food_id'])
                        i += 1
                        # all_data[hall_name][option_name][day][period_name][menu_item_name] = {}
                break  # only choose one day
    return hall_data


if __name__ == '__main__':
    # get_dining_halls()
    # get_hall_options(1)
    # get_option_days_menus(2)
    # get_menu(1117675)

    # print(get_nutritional_info(97570309))
    with open('food_data.json', 'w') as f:
        f.write(json.dumps(scrape_api()))
# print(get_nutritional_info(98022490))

# with open('lol.html', 'wb') as f:
#     f.write(get_nutritional_info(98022490))

# hi Louis!!!!! :D Your computer is really nice to type in. I feel cool. 