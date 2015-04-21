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


            food.rank = food.foodname.length / rankcounter;
            return true;
        });
        /* End matching logic */

        //displaying logic
        $('#fuzzy-results').empty();
        var i = 0;

        //matches.sort(function (a, b) {
        //    if (a.rank > b.rank)
        //        return 1;
        //    if (a.rank < b.rank)
        //        return -1;

        //    return 0;
        //});

        matches.forEach(function (match) {
            if (i < 15) {
                $('#fuzzy-results').append($('<li>').html(wrapFuzzyResultInBoldText(match)));
                i++;
            }
            else
                return 0;
        });

    }).keyup();

}

function wrapFuzzyResultInBoldText(match) {
    var result = match.foodname;
    match.matchindices.sort(function sortNumber(a, b) {
        return a - b;
    });

    var uniqueIndicies = []
    $.each(match.matchindices, function (i, el) {
        if ($.inArray(el, uniqueIndicies) === -1) uniqueIndicies.push(el);
    });

    //pretty much for every index in match.matchindicies wrap that letter in <strong> tags so its bold
    var indexbuf = 0;
    $.each(uniqueIndicies, function (i, index) {
        var bold = "<strong>" + result[index + indexbuf] + "</strong>";

        var first = result.substring(0, index + indexbuf);
        var sec = result.substring(index + indexbuf + 1);

        result = first + bold + sec;
        indexbuf += 17;


    });

    return result;
}

function getFood(id) {
    $.getJSON('api/Food/' + id)
    .done(function (data) {
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
                foodname: el.Display_Name.replace(/&amp;/g, '&') + " - " + el.Portion_Display_Name.replace(/&amp;/g, '&'),
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
