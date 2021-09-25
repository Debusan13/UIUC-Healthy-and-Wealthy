import json
from flask import Flask, render_template, jsonify
import main

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
                    hall_data[hall_name][menu_item_name] = {}
                    # all_data[hall_name][option_name][day][period_name][menu_item_name] = {}
                    i += 1
            break

@app.route('/get_hall_info', method=['POST'])
def get_hall_info():
    return jsonify(hall_data)
