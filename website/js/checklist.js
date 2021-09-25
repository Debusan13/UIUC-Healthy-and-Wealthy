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
    let valueSelected = this.value

    $('#food-list').empty()
    for (const [food_name, data] of Object.entries(dining_data[valueSelected])) {
        $('#food-list').append($(`
            <div class="row food-list-entry">
                <div class="col-3"></div>
                <div class="text-left col-3">
                    <label for="hour">${food_name}</label>
                </div>
                <div class="col-3">
                    <input type="number" id="${food_name}" min="0" max="10"/>
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

$('#form-thingy').on('submit', function(e) {
    e.preventDefault()

    const myname = $('#name-field').val()

    let points = 0
    $('.food-list-entry > div > input').each(function(index, element) {
        let point = parseInt(element.value)
        if (Number.isInteger(point)) {
            points += point
        }
    })

    let currentPoints = localStorage.getItem('mypoints') || 0
    currentPoints = parseInt(currentPoints)
    
    $('#point-count').html(`${myname}, you have ${currentPoints + points} points`)
    localStorage.setItem('myname', myname)
    localStorage.setItem('mynetid', myname)
    localStorage.setItem('mypoints', currentPoints + points)
    window.scrollTo(0, 0)
})

$(function() {
    const myname = localStorage.getItem('myname')
    const mynetid = localStorage.getItem('mynetid')
    const mypoints = localStorage.getItem('mypoints')
    if (myname !== null && mypoints !== null && myname !== undefined && mypoints !== undefined) {
        $('#point-count').html(`${myname}, you have ${mypoints} points`)
        $('#name-field').val(myname)
        $('#netid-field').val(mynetid)
    } else {
        $('#point-label').html('No points!')
    }
})

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