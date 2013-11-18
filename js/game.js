/**
 * Created by overlord on 2013.11.15..
 */

var tower = $('#tower');
var shaft = $('#elevator');
var lift = $('#lift');
var baseCurreny = parseInt(300);

function transportLevel(loc,no) {
    return '<div class="level" id="transport-' + loc + '-' + no + '"></div>';
}

function towerLevel(loc,no) {
    return '<div class="level" id="level-' + loc + '-' + no + '"></div>';
}


/*
Adding a level above the lobby
 */
function addLevel(type, free) {

    /*
    Get the levels
     */
    var levels = $("[id*='level-" + type + "']");
    var count = parseInt($.map(levels,function (n, i) {
        return i;
    }).length);

    if (type!='a' || type != 'b') {
        return false;
    }

    /*
    If it's a free insert, then do nothing but insert the level
     */
    if (free == true) {
        if (type == 'a') {
            tower.prepend(towerLevel(type,(count + 1)));
            shaft.prepend(transportLevel(type,(count + 1)));
        } else {
            tower.append(towerLevel(type,(count + 1)));
            shaft.append(transportLevel(type,(count + 1)));
        }
    } else {
        /*
        Decrease the currency if possible, and insert the new level
         */
        if (setBaseCurrency('dec', 100) == true) {
            if (type == 'a') {
                tower.prepend(towerLevel(type,(count + 1)));
                shaft.prepend(transportLevel(type,(count + 1)));
            } else {
                tower.append(towerLevel(type,(count + 1)));
                shaft.append(transportLevel(type,(count + 1)));
            }
        } else {
            alert('Need more credits');
        }
    }

    return true

}


function moveTransportUp() {
    var currentPosition = lift.parent('div').attr('id');
    var nextPosition;
    if (currentPosition == 'transport-lobby') {
        nextPosition = 'transport-a-1';
    } else {
        var tempVal = currentPosition.split('-');


        if (tempVal[1] == 'a') {
            nextPosition = 'transport-a-' + (parseInt(tempVal[2]) + 1);
        } else {
            nextPosition = 'transport-b-' + (parseInt(tempVal[2]) - 1);
        }

        if (nextPosition == 'transport-b-0') {
            nextPosition = 'transport-lobby';
        }

    }

    lift.appendTo('#' + nextPosition);
}

function moveTransportDown() {
    var currentPosition = lift.parent('div').attr('id');
    var nextPosition;

    if (currentPosition == 'transport-lobby') {
        nextPosition = 'transport-b-1';
    } else {
        var tempVal = currentPosition.split('-');

        if (tempVal[1] == 'a') {
            nextPosition = 'transport-a-' + (parseInt(tempVal[2]) - 1);
        } else {
            nextPosition = 'transport-b-' + (parseInt(tempVal[2]) + 1);
        }

        if (nextPosition == 'transport-a-0') {
            nextPosition = 'transport-lobby';
        }

    }

    lift.appendTo('#' + nextPosition);
}

function setBaseCurrency(changeType, value) {
    if (changeType == 'inc') {
        baseCurreny = baseCurreny + parseInt(value);
        renderBaseCurrency();
        return true;
    } else if (changeType == 'dec') {
        change = baseCurreny - parseInt(value);

        if (change < 0) {
            return false;
        }

        baseCurreny = change;
        renderBaseCurrency();
        return true;
    } else {
        return false;
    }


}

function renderBaseCurrency() {
    $('#baseCurrency').html(baseCurreny);
}

function dumpOut(toDump) {
    $('#dumpOut').html('<pre>' + toDump.dump() + '</pre>');
}

$(document).ready(function () {

    renderBaseCurrency();

    $(function () {
        /* Watch for keypress */
        $(window).keypress(function (e) {
            var key = e.which;

            if (key == 119) {
                /* 119 = W */
                moveTransportUp();
            } else if (key == 115) {
                /* 115 = S */
                moveTransportDown();
            }
        });
    });

});

