// $(document).ready(() => {
//     $('.info').on('submit', () => {
//         return false;
//     });
// });

// //pressing the button
// $('#process_input').click(function(){
//     $('.info').submit();
// })

// //pressing enter
// $('.info').keypress((e) => {
//     if (e.which === 13) {
//         $('.info').submit();
//     }
// })

//submitting form info
$("#process_input").on("click", function () {
    var weight = $('#weight').val();
    var height_ft = $('#height_ft').val();
    var height_in = $('#height_in').val();
    var sex = $('#sex').val();
    var activity_level = $('#activity_level').val();
    var age = $('#age').val();
    var goal = $('#goal').val();

    var data = {
        "weight" : weight,
        "height_ft" : height_ft,
        "height_in" : height_in,
        "sex" : sex,
        "activity_level" : activity_level,
        "age" : age,
        "goal" : goal
    }
    
    $.ajax({
        type:'POST',
        url:'/',
        contentType:'application/json;charset=UTF-8',
        data : JSON.stringify(data)
    })
    .done(function(data) {
        // console.log(data); // person's goals
        localStorage.setItem("cholesterol", data["cholesterol"]);
        localStorage.setItem("daily_cal", data["daily_cal"]);
        localStorage.setItem("fat", data["fat"]);
        localStorage.setItem("protien", data["protien"]);
        localStorage.setItem("sugar", data["sugar"]);

    })
})

//get data back from python
$(function() {
    const myname = localStorage.getItem('myname')
    const mypoints = localStorage.getItem('mypoints')
    if (myname !== null && mypoints !== null && myname !== undefined && mypoints !== undefined) {
        $('#point-count').html(`${myname}, you have ${mypoints} points`)
    } else {
        $('#point-count').html('')
    }
})
