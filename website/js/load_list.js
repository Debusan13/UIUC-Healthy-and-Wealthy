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

    $('#food-list1').empty()
    $('#food-list2').empty()
    let lengthA = Math.floor(Object.entries(dining_data[valueSelected]).length / 2);
    let lengthB = Object.entries(dining_data[valueSelected]).length - lengthA;
    for (const [food_name, data] of Object.entries(dining_data[valueSelected])) {
        if (lengthA > 0) {
            $('#food-list1').append($(`
            <div class="row food-list-entry">
                <div style="text-align: left" class="col-6">
                    <label for="hour">${food_name}</label>
                </div>
                <div class="col-3">
                    <input type="number" id="${food_name}" min="0" max="10"/>
                </div>
            </div>
        `   ));
            lengthA -= 1;
        } else {
            $('#food-list2').append($(`
            <div class="row food-list-entry">
                <div style="text-align: left" class="col-6">
                    <label for="hour">${food_name}</label>
                </div>
                <div class="col-3">
                    <input type="number" id="${food_name}" min="0" max="10"/>
                </div>
            </div>
        `   ));
            lengthB -= 1;
        }

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
    
    $('#point-label').html(myname + ', have ' + points + ' points available')
    localStorage.setItem('myname', myname)
    localStorage.setItem('mynetid', myname)
    localStorage.setItem('mypoints', points)
    window.scrollTo(0, 0)
})

$(function() {
    const myname = localStorage.getItem('myname')
    const mynetid = localStorage.getItem('mynetid')
    const mypoints = localStorage.getItem('mypoints')
    if (myname !== null && mypoints !== null && myname !== undefined && mypoints !== undefined) {
        $('#point-label').html(myname + ', you have ' + mypoints + ' points available')
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