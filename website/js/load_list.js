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

    let points = 0
    $('.food-list-entry > input').each(function(index, element) {
        let point = parseInt(element.value)
        if (Number.isInteger(point)) {
            points += point
        }
    })
    const myname = $('name-field').val()
    $('#point-label').html(myname + ', have ' + points + ' points available')
    // window.localStorage.setItem('myname', myname)
    // console.log(window.localStorage.getItem('myname'))
    // window.localStorage.setItem('mypoints', points)
})

// $(function() {
//     const myname = localStorage.getItem('myname')
//     console.log(myname)
//     const mypoints = localStorage.getItem('mypoints')
//     if (myname !== null && mypoints !== null && myname !== undefined && mypoints !== undefined) {
//         $('#point-label').html(myname + ', have ' + mypoints + ' points available')
//     } else {
//         $('#point-label').html('e')
//     }
// })



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