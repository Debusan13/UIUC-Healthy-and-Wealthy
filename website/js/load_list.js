'use strict';

for (const [dining_hall_name, food_items] of Object.entries(dining_data)) {
    for (const [food_name, data] of Object.entries(food_items)) {
        console.log(food_name)
        $('#food-list').append($(`
            <div class="food-list-entry">
                <label for="hour">${food_name}</label>
                <input type="number" id="hour" min="0" max="10" />
                <br />
            </div>
        `))
    }
}