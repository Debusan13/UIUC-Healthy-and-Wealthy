import json
from flask.helpers import send_from_directory
import requests
from flask import Flask, render_template, jsonify, request
from main import *

# hall_data = {}

# def scrape_api():
#     dining_halls = get_dining_halls()
#     for hall_name, hall_id in dining_halls.items():
#         hall_data[hall_name] = {}
#         options = get_hall_options(hall_id)
#         for option_name, option_id in options.items():
#             # all_data[hall_name][option_name] = {}
#             days_menus = get_option_days_menus(option_id)
#             for day, periods in days_menus.items():
#                 # all_data[hall_name][option_name][day] = {}
#                 for period_name, menu_id in periods.items():
#                     # all_data[hall_name][option_name][day][period_name] = {}
#                     menu = get_menu(menu_id)
#                     for menu_item_name, data in menu.items():
#                         hall_data[hall_name][menu_item_name] = get_nutritional_info(data['food_id'])
#                         # all_data[hall_name][option_name][day][period_name][menu_item_name] = {}
#                 break  # only choose one day

# scrape_api()

app = Flask(__name__)

hall_data = requests.get('https://gist.githubusercontent.com/LouisAsanaka/d74ea7462b13a1f5b4d4212853fe6ced/raw/35e7e263654e6c3549b37096037a1ded72fb08ae/food_data.json').text

@app.route('/img/<path:path>')
def serve_img(path):
    return send_from_directory('website/img', path)

@app.route('/js/<path:path>')
def serve_js(path):
    return send_from_directory('website/js', path)

@app.route('/css/<path:path>')
def serve_css(path):
    return send_from_directory('website/css', path)

@app.route('/pyghack2021main.html')
@app.route('/', methods=['POST', 'GET'])
def serve_main():
    if not request.get_json() == None:
        data = request.get_json()
        targets = get_targets(data)
        return jsonify(targets)
    return send_from_directory('website', 'pyghack2021main.html')
    # return render_template('website/pyghack2021main.html')

@app.route('/checklist')
def serve_checklist():
    return send_from_directory('website', 'foodchecklist.html')

@app.route('/progress')
def serve_progress():
    return send_from_directory('website', 'yourprogress.html')

@app.route('/<path:path>')
def serve_add_meals(path):
    return send_from_directory('website', path)

@app.route('/get_hall_info')
def get_hall_info():
    response = app.response_class(
        response=hall_data,
        status=200,
        mimetype='application/json'
    )
    return response

