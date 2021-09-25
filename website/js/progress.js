$(function() {
    const myname = localStorage.getItem('myname')
    let mypoints = localStorage.getItem('mypoints')
    if (myname !== null && mypoints !== null && myname !== undefined && mypoints !== undefined) {
        $('#point-count').html(`${myname}, you have ${mypoints} points`)
        $('#my-points').html(`${mypoints}`)

        const maxi = 100.0;
        let percentage = parseInt(mypoints) / maxi
        console.log(percentage)
        percentage = Math.min(Math.max(percentage, 0.0), 1.0)
        const lerp = (x, y, a) => x * (1 - a) + y * a;
        const lerped = lerp(283, 0, percentage)
        $('#progress-circle').attr('stroke-dashoffset', `${lerped}%`)
    } else {
        $('#point-count').html('')
        $('#my-points').html('0')
    }


})

$("#cholesterol_progress").html(Math.floor(parseInt(localStorage.getItem("cholesterol")) * 0.4));
$("#cholesterol_goal").html("/" + localStorage.getItem("cholesterol"));

$("#daily_cal_progress").html(Math.floor(parseInt(localStorage.getItem("daily_cal")) * 0.2));
$("#daily_cal_goal").html("/" + localStorage.getItem("daily_cal"));

$("#fat_progress").html(Math.floor(parseInt(localStorage.getItem("fat")) * 0.8));
$("#fat_goal").html("/" + localStorage.getItem("fat"));

$("#protein_progress").html(Math.floor(parseInt(localStorage.getItem("protien")) * 0.7));
$("#protein_goal").html("/" + localStorage.getItem("protien"));

$("#sugar_progress").html(Math.floor(parseInt(localStorage.getItem("sugar")) * 0.5));
$("#sugar_goal").html("/" + localStorage.getItem("sugar"));

console.log(localStorage.getItem("fat"));
console.log(localStorage.getItem("protien"));
console.log(localStorage.getItem("sugar"));