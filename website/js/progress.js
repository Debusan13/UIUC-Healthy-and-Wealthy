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