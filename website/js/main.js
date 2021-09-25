$(function() {
    const myname = localStorage.getItem('myname')
    const mypoints = localStorage.getItem('mypoints')
    if (myname !== null && mypoints !== null && myname !== undefined && mypoints !== undefined) {
        $('#point-count').html(`${myname}, you have ${mypoints} points`)
    } else {
        $('#point-count').html('')
    }
})