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

            var j = 0; // remembers position of last found character
            var rankcounter = 0;
            food.matchindices = [];

            // consider each search character one at a time 
            for (var i = 0; i < search.length; i++) {
                var l = search[i];
                if (l == ' ') continue;     // ignore spaces

                j = food.foodname.toLowerCase().indexOf(l);     // search for character & update position
                if (j == -1) {
                    return false;  // if it's not found, exclude this item
                }
                else {
                    food.matchindices.push(j); //else its found add its index to item
                    for (var x = 0; x < food.matchindices.length; x++) {
                        if (j >= food.matchindices[x]) {
                            rankcounter += 5;
                        }
                        else
                            rankcounter++;
                    }

                }
            }


            food.rank = food.foodname / rankcounter;
            return true;
        });
        /* End matching logic */

        //displaying logic
        $('#fuzzy-results').empty();
        var i = 0;

        matches.sort(function (a, b) {
            if (a.rank > b.rank)
                return 1;
            if (a.rank < b.rank)
                return -1;

            return 0;
        });

        matches.forEach(function (match) {
            if (i < 15) {
                $('#fuzzy-results').append($('<li>').text(wrapFuzzyResultInBoldText(match)));
                i++;
            }
            else
                return 0;
        });

    }).keyup();

}

function wrapFuzzyResultInBoldText(match) {
    var result = match.foodname;
    //pretty much for every index in match.matchindicies wrap that letter in <strong> tags so its bold
    


    return result;
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
                foodname: el.Display_Name + " - " + el.Portion_Display_Name,
                matchindices: [],
                rank: 0
            }
            foodata.foodSearchArray[i] = foodItem;
        })

        return data;
    })
    .fail(function (jqXHR, textStatus, err) {
        alert('Error: ' + err);
    });

}