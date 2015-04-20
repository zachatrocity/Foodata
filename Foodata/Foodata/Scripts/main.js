var foodata = {
    allfood: [],
    foodSearchArray: []
}
 
$(init);

function init() {
    foodata.allfood = getAllFood();

    $('#fuzzy-search').keyup(function () {
        var search = $(this).val();

        /* Matching logic */
        var matches = foodata.foodSearchArray.filter(function (food) {

            var item = food.foodname;

            var j = 0; // remembers position of last found character

            // consider each search character one at a time
            for (var i = 0; i < search.length; i++) {
                var l = search[i];
                if (l == ' ') continue;     // ignore spaces

                j = item.indexOf(l, j + 1);     // search for character & update position
                if (j == -1) return false;  // if it's not found, exclude this item
            }
            return true;
        });
        /* End matching logic */

        $('#fuzzy-results').empty();
        var i = 0;
        matches.forEach(function (match) {
            if (i < 15) {
                $('#fuzzy-results').append($('<li>').text(match.foodname));
                i++;
            }
        });

    }).keyup();

}

function getFood(id) {
    $.getJSON('api/Food/' + id)
    .done(function (data) {
        //create index strings
        console.log(data)
    })
    .fail(function (jqXHR, textStatus, err) {
        alert('Error: ' + err);
    });

}

function getAllFood() {
    $.getJSON('api/Food')
    .done(function (data) {
        // On success, 'data' contains all food
        $.each(data, function (i, el) {
            var foodItem = {
                primarykey: el.primaryKey,
                foodname: el.Display_Name
            }
            foodata.foodSearchArray[i] = foodItem;
        })

        return data;
    })
    .fail(function (jqXHR, textStatus, err) {
        alert('Error: ' + err);
    });

}