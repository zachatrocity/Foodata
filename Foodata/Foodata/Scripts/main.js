var foodata = {
    allfood: [],
    foodSearchArray: []
}
 
$(init);

function init() {
    foodata.allfood = getAllFood();

    $('.fuzzylink').live('click', function (event) {
        getSpecificFoodItem(event.currentTarget);
        event.preventDefault();
        event.stopPropagation();
    });

    $('#fuzzy-search').keyup(function (e) {

        if (e.keyCode != 40 && e.keyCode != 38) {

            if ($('.food-item-view').hasClass('visible')) {
                $('.food-item-view').removeClass('animated bounceInDown');
                $('.food-item-view').addClass('animated bounceOutUp');
                $('.food-item-view').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    $('.food-item-view').removeClass('visible');
                    $('.food-item-view').addClass('invisible');
                    $('#fuzzy-results').removeClass('invisible animated bounceOutDown')
                    $('#fuzzy-results').addClass('visible')
                    $('#fuzzy-results').addClass('animated bounceInUp')
                    $('#fuzzy-results').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $('#fuzzy-results').removeClass('animated bounceInUp')
                        $('.food-item-view').removeClass('animated bounceOutUp');
                    });
                });
            }

            
            var search = $(this).val().toLowerCase();

            if (search == "") {
                //clear the list
                $('#fuzzy-results').empty();
            }
            else {
                fuzzy(search);
            }
        }

    }).keyup();


    $('#fuzzy-search').keydown(function (e) {
        if (e.keyCode == 40 || e.keyCode == 38) {
            var $results = $('.fuzzy-item');
            var $selected = $results.filter('.highlighted-item');
            var $current;
            var key = e.keyCode;

            $results.removeClass('highlighted-item');

            if (key == 40) // Down key
            {
                if (!$selected.length || $selected.is(':last-child')) {
                    $current = $results.eq(0);
                }
                else {
                    $current = $selected.next();
                }
            }
            else if (key == 38) // Up key
            {
                if (!$selected.length || $selected.is(':first-child')) {
                    $current = $results.last();
                }
                else {
                    $current = $selected.prev();
                }
            }

            $current.addClass('highlighted-item');
        }
        else if (e.keyCode == 13) {
            var $res = $('.highlighted-item');
            getSpecificFoodItem();
        }

    });

}

function getSpecificFoodItem(a) {
    var $res;

    if (a) {
        $res = $(a)[0];
    }
    else {
        $res = $('.highlighted-item').children()[0];
    }
    toggleResults();

    $.getJSON($res.href)
        .done(function (data) {
            $('.food-item-view').removeClass('invisible');
            $('.food-item-view').addClass('visible')
            $('.food-item-view').addClass('animated bounceInDown')
            console.log(data)
        })
        .fail(function (jqXHR, textStatus, err) {
            alert('Error: ' + err);
        });

}

function fuzzy(search) {
    var rankcounter = 0;
    /* Matching logic */
    var matches = foodata.foodSearchArray.filter(function (food) {

        var j = 0; // remembers position of last found character
        rankcounter = 0;
        food.matchindices = [];

        if (food.foodname.toLowerCase().indexOf(search) != -1) {
            if (food.foodname.toLowerCase().indexOf(search) == 0)
                rankcounter = 2000;//prioritize ones where the match is found at the beginning
            else
                rankcounter = 1000;
            for (var i = 0; i < search.length; i++) {
                food.matchindices.push(food.foodname.toLowerCase().indexOf(search[i]));
            }
        }
        else {
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
        }

        food.rank = rankcounter;
        return true;
    });
    /* End matching logic */

    //displaying logic
    $('#fuzzy-results').empty();
    var i = 0;

    //bubble sort to sort matches by rank
    for (var a = 0; a < matches.length; a++) {
        for (var b = a; b < matches.length; b++) {
            if (matches[b].rank > matches[a].rank) {
                var helper = matches[a];
                matches[a] = matches[b];
                matches[b] = helper;
            }
        }
    }

    matches.forEach(function (match) {
        if (i < 15) {
            $('#fuzzy-results').append($("<li class='fuzzy-item'>")
                               .append($("<a class= 'fuzzylink' href='/api/food/" + match.primarykey + "'>")
                               .append($("<span>").html(wrapFuzzyResultInBoldText(match)))));
            i++;
        }
        else
            return 0;
    });
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
    $.getJSON('../api/Food')
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


function toggleResults() {
    $('#fuzzy-results').toggleClass('animated bounceOutDown');
    $('#fuzzy-results').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $('#fuzzy-results').removeClass('visible');
        $('#fuzzy-results').addClass('invisible');
    });
}
