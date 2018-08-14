

var map;

// On DOM ready
$(function() {
    console.log( "MapHelper ready!" );

    map = $("#map");


    drawGrid();

});

// Draws a x by y grid
/*

- MVP version will have only a set 400x400 but later, we plan to have more.

*/
function drawGrid() {
    var unitSize = 10;
    var sizeX = 400;
    var sizeY = 400;

    for (var i = 0; i < sizeX; i+=unitSize ){
        for (var j = 0; j < sizeY; j+=unitSize ){
                console.log("Drawing: " + i + ", " + j);
                map.append(util_generateUnitDom(i,j));
            }
        }
    
}


// This utility function generates a dom element in HTML to be inserted into the parent dom
function util_generateUnitDom(x,y){
    var e = "<div class='mapUnit' style='left: " + x 
    + "px; top: " + y + "px;'><span class='locX'>" + x + 
    "</span><span class='locY'>" + y + 
    " </span></div>";
    return e;
}

