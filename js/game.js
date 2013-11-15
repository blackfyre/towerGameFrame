/**
 * Created by overlord on 2013.11.15..
 */

var tower = $('#tower');
var shaft = $('#elevator');
var lift = $('#lift');

function addLevelAbove() {
    event.preventDefault();
    var levels = $("[id*='level-a']");
    var count = $.map(levels, function(n, i) { return i; }).length;
    tower.prepend('<div class="level" id="level-a-' + count+1 + '">&nbsp</div>');
    shaft.prepend('<div class="level" id="transport-a-' + count+1 + '">&nbsp</div>');

}

function addLevelBeyond() {
    var levels = $("[id*='level-b']");
    var count = $.map(levels, function(n, i) { return i; }).length;
    tower.append('<div class="level" id="level-b-' + count+1 + '">&nbsp</div>');
    shaft.append('<div class="level" id="transport-b-' + count+1 + '">&nbsp</div>');
}

function moveTransportUp() {
    var currentPosition = lift.parent('div').attr('id');
    var nextPosition;
    if (currentPosition == 'transport-lobby') {
        nextPosition = 'transport-a-1';
    } else {
        var tempVal = currentPosition.split('-');


            if (tempVal[1]=='a') {
                nextPosition = 'transport-a-' + (parseInt(tempVal[2]) +1);
            } else {
                nextPosition = 'transport-b-' + (parseInt(tempVal[2]) -1);
            }


    }

    lift.appendTo('#'+nextPosition);
}

function moveTransportDown() {
    var currentPosition = lift.parent('div').attr('id');
    var nextPosition;

    if (currentPosition == 'transport-lobby') {
        nextPosition = 'transport-b-1';
    } else {
        var tempVal = currentPosition.split('-');

            if (tempVal[1]=='a') {
                nextPosition = 'transport-a-' + (parseInt(tempVal[2]) -1);
            } else {
                nextPosition = 'transport-b-' + (parseInt(tempVal[2]) +1);
            }

    }

    lift.appendTo('#'+nextPosition);
}

function dumpOut(toDump) {
    $('#dumpOut').html('<pre>' + toDump.dump() + '</pre>');
}