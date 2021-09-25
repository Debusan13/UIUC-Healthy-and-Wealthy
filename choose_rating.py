import json
import random

with open('food_data.json', 'r') as f:
    data = json.loads(f.read())

for hall_name, food_items in data.items():
    for food_item, food_data in food_items.items():
        food_data['Reward'] = random.randint(1, 5)
        data[hall_name][food_item] = food_data
with open('food_data_rewards.json', 'w') as f:
    f.write(json.dumps(data))
