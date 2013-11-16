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

function addLevelAbove() {
    if (setBaseCurrency('dec', 100) == true) {
        event.preventDefault();
        var levels = $("[id*='level-a']");
        var count = parseInt($.map(levels,function (n, i) {
            return i;
        }).length);
        tower.prepend(towerLevel('a',(count + 1)));
        shaft.prepend(transportLevel('a',(count + 1)));
    } else {
        alert('Need more credits');
    }

}

function addLevelBeyond() {

    if (setBaseCurrency('dec', 100) == true) {
        var levels = $("[id*='level-b']");
        var count = parseInt($.map(levels,function (n, i) {
            return i;
        }).length);
        tower.append('<div class="level" id="level-b-' + (count + 1) + '"></div>');
        shaft.append('<div class="level" id="transport-b-' + (count + 1) + '"></div>');
    } else {
        alert('Need more credits');
    }


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

