console.log("client.js has been loaded");

$(document).ready(function(){
    console.log("jQuery has been loaded");
    $.ajax({
        method: 'POST',
        url: '/shoes',
        data: {
            name: 'Nike Air Jordan',
            cost: '110'
        },
        success: function(response){
            console.log('response', response);

        }
    })
})