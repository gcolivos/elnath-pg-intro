console.log("client.js has been loaded");

$(document).ready(function () {
    console.log("jQuery has been loaded");
    $('#addNewAirs').on('click', addNewAirs);
    $(document).on('click','.deleteButton', removeShoe);
    $(document).on('click','.saveButton', editShoe);
    getShoes;
})

function getShoes() {
    $.ajax({
        method: 'GET',
        url: '/shoes',
        success: function (response) {
            console.log('response', response);
            $('#shoeTable').empty();
            for (i = 0; i < response.length; i++) {
                var shoe = response[i];
                var $newShoeItem = $ ('<tr><td>' + shoe.name + "</td></tr>");

                //create and append the delete button
                var $deleteShoeButton = $('<button class="deleteButton">Delete</button>');
                $deleteShoeButton.data('id', shoe.id);
                $newShoeItem.append($deleteShoeButton);

                //create and append the save button
                var $saveShoeButton = $('<button class="saveButton">Edit</button>');
                $saveShoeButton.data('id', shoe.id);
                $newShoeItem.append($saveShoeButton);

                //apend new list item to DOM
                $('#shoeTable').append($newShoeItem);
            }
        }
    });
}

function addNewAirs() {
    $.ajax({
        method: 'POST',
        url: '/shoes',
        data: {
            name: 'Nike Air Jordan',
            cost: '110'
        },
        success: function (response) {
            console.log('response', response);
            getShoes();
        }
    })
}

function removeShoe(e, complete){
    var shoeIdToRemove = $(this).data().id;
    console.log('Remove shoe was clicked! The shoe id was', shoeIdToRemove);

    $.ajax({
        method: 'DELETE',
        url: '/shoes/' + shoeIdToRemove,
        success: function(response){
            getShoes();
        }
    })
}

function editShoe(){
    console.log($(this).data());//this should log {id:7} or whatever the id is
    var shoeIdToSave = $(this).data().id;
    var updatedShoe = newShoeFields(shoeIdToSave)
    console.log('Save shoe was clicked! The shoe id was', shoeIdToSave);

    $.ajax({
        method: 'PUT',
        url: '/shoes/' + shoeIdToSave,

        //PUT needs to know the data you are editing
        data: updatedShoe,
        success: function(response){
            getShoes();
        }
    })
}

function newShoeFields(sampleId){
    var newShoeName = prompt("What is the new name of this shoe?");
    var newShoeCost = prompt("And what is the new cost of the shoe?");
    var newShoeInfo = {
        id: sampleId,
        name: newShoeName,
        cost: newShoeCost
    };
    return newShoeInfo
}