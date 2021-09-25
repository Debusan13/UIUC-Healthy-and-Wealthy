'use strict';

let first = true
for (const [dining_hall_name, food_items] of Object.entries(dining_data)) {
    if (first) {
        $('#dining-halls').append($(`
            <option value="${dining_hall_name}" selected>${dining_hall_name}</option>
        `))
        first = false
    } else {
        $('#dining-halls').append($(`
            <option value="${dining_hall_name}">${dining_hall_name}</option>
        `))
    }
}

$("#dining-halls").on('change', function() {
    let optionSelected = $("option:checked", this)
    let valueSelected = this.value

    $('#food-list').empty()
    for (const [food_name, data] of Object.entries(dining_data[valueSelected])) {
        $('#food-list').append($(`
            <div class="row">
                <div class="col-3"></div>
                <div class="text-left col-3">
                    <label for="hour">${food_name}</label>
                </div>
                <div class="col-3">
                    <input type="number" id="number" min="0" max="10"/>
                </div>
            </div>
        `))
    }
    // for (const [food_name, data] of Object.entries(dining_data[valueSelected])) {
    //     $('#food-list').append($(`
    //         <div class="food-list-entry">
    //             <label for="hour">${food_name}</label>
    //             <input type="number" id="hour" min="0" max="10" />
    //             <br />
    //         </div>
    //     `))
    // }
});
$("#dining-halls").trigger('change')

// for (const [dining_hall_name, food_items] of Object.entries(dining_data)) {
//     for (const [food_name, data] of Object.entries(food_items)) {
//         $('#food-list').append($(`
//             <div class="food-list-entry">
//                 <label for="hour">${food_name}</label>
//                 <input type="number" id="hour" min="0" max="10" />
//                 <br />
//             </div>
//         `))
//     }
// }