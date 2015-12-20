//declares variables
var interval;  //sets global variable used by timer

//runs function initialization on document load

$(document).ready(function() {
    init();
});

//initializes functions that should be enabled on document load

function init() {
    enable();
};

//enables functions

function enable() {
    getData();
    timer();
    nextPerson();
    previousPerson();
    indexClick();
};

//pulls data down from server

function getData() {
    $.ajax({
        type: "GET",
        url: "/data",
        success: function (data) {
            appendDom(data);
        }

    });
}

//cycles through data pulled from the server and adds all objects for display to the div, adds classes and data points

function appendDom(data) {

    for (var i = 0; i < data.people.length; i++) {
        $('.container').append('<div class="peopleContainer" data-personNumber="'+ i +'" data-person="yes"></div>');
        var $el = $('.container').children().last();
        $el.css('background-image', 'url(' + data.people[i].imgURL + ')');

        $el.append('<h2 class="person-name">' + data.people[i].name + '</h2>');
        $el.append('<p class="person-location">' + data.people[i].location + ', MN</p>');
        $el.append('<p class="person-animal">' + data.people[i].animal + '</p>');
        $el.hide();

        $('.indices').append('<button class="index" data-index="'+ i +'"></button>')

    }
    $('.container').children().first().show();
    $('.container').children().first().addClass('shown');
};

//functionality for when the 'next' button is clicked

function nextPerson() {
    $('.next').on('click', function() {
        if ($('.shown').next().data('person') == 'yes') {
            $('.shown').fadeOut().removeClass('shown').next().delay(400).fadeIn().addClass('shown');
        } else {
            $('.shown').fadeOut().removeClass('shown').parent().children().first().delay(400).fadeIn().addClass('shown');

        }

        resetTimer();
    })
};

//functionality for when the 'previous' button is clicked

function previousPerson() {
    $('.previous').on('click', function() {
        if ($('.shown').prev().data('person') == 'yes') {
            $('.shown').fadeOut().removeClass('shown').prev().delay(400).fadeIn().addClass('shown');
        } else {
            $('.shown').fadeOut().removeClass('shown').parent().children().last().delay(400).fadeIn().addClass('shown')
        }

        resetTimer();
    })
};

//functionality for when an index button is clicked


function indexClick() {
    $('.indices').on('click', '.index', function() {
        var index = $(this).data('index');
        $('.shown').fadeOut().removeClass('shown').parent().find('[data-personNumber="'+ index +'"]').delay(400).fadeIn().addClass('shown');

        resetTimer();
    })

};

//creates timed interval for automatic carousel rotation

var timer = function() {
    interval = setInterval(function() {

        if ($('.shown').next().data('person') == 'yes') {
            $('.shown').fadeOut().removeClass('shown').next().delay(400).fadeIn().addClass('shown');
        } else {
            $('.shown').fadeOut().removeClass('shown').parent().children().first().delay(400).fadeIn().addClass('shown');

        };

    }, 10000);
};

//resets timer

function resetTimer() {
    clearInterval(interval);
    timer();

};

//with more time, i would add functionality to highlight the index the carousel is currently displaying.  when i tried to do this before, i was having difficulty pulling the data point off the "peopleContainer" div.









