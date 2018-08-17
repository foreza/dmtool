

var map;
var mapContainer;


var encounterMap =  {

    characters : [],
    currentlySelected : ""

}


// On DOM ready
$(function() {
    console.log( "MapHelper ready!" );
    map = $("#map");
    mapContainer = $("#map-container");


    drawGrid();

});

// Draws a x by y grid
/*

- MVP version will have only a set 400x400 but later, we plan to have more.

*/
function drawGrid() {
    var unitSize = 40;
    var sizeX = 400;
    var sizeY = 400;
    var id = 0;

    for (var i = 0; i < sizeX; i+=unitSize ){
        for (var j = 0; j < sizeY; j+=unitSize ){
                console.log("Drawing: " + i + ", " + j);
                map.append(util_generateUnitDom(i,j, id ));
                ++id;
            }
        }

        // TODO: IMPLEMENT


        // Bind on click events
       

        $(".mapUnit").hover(
            
            function (event) {
                if ($( "#"+event.target.id).children().length >= 1) {
                    $( "#"+event.target.id ).addClass( "highlight-grid" );

                    $("#"+event.target.id).click(function (event) {    
        
                        if (encounterMap.currentlySelected != "" && $( "#"+event.target.id).children().length >= 1){       

                            console.log("Curr select: ", encounterMap.currentlySelected);
                            console.log("child.." + $( "#"+event.target.id).children().length);

                            moveCharacterPiece(encounterMap.currentlySelected, event.target.id);
                            console.log("Moved to map unit:", event.target);
                            $(  "#"+event.target.id  ).removeClass( "highlight-grid" )

                        } else {
                        console.log("Clicked on map unit:", event.target);
                    }
                });
            }        
        }, function (event) {
                $(  "#"+event.target.id  ).removeClass( "highlight-grid" )
    
            })

        

        // Bind on click events
       

    $("#0-unit").append(util_generateCharacterDom("over90000"));     // generates but is not yet attached

    $(".charUnit").click(function (event) {
        console.log("Clicked on sprite:", event.target.id);
        encounterMap.currentlySelected = event.target.id;
    });

    
}

// This function detaches something from the dom and moves it to the new location
function moveCharacterPiece(uID, newLocID){

        console.log("Moving: " + uID + " to: " + newLocID);
        var element = $('#'+uID).detach();
        $("#"+newLocID).append(element);
        $(  "#"+newLocID).removeClass( "highlight-grid" )
        encounterMap.currentlySelected = "";

    
}

// This will query the DB and get the object from the room collection
function retrieveEncounterInformation(){
    
}

// If the DB does not yet have information, we should create an object and persist that under the room collection
function generateEncounterInformation(){

}





// This utility function generates a dom element in HTML to be inserted into the parent dom
function util_generateUnitDom(x, y, id){
    var e = "<div id='" + id + "-unit" + "' class='mapUnit' style='left: " + x 
    + "px; top: " + y + "px;'><span class='locX'>" + x + 
    "</span><span class='locY'>" + y + 
    " </span></div>";
    return e;
}

// This utility function generates a character in this location. This should be run on init
function util_generateCharacterDom(uID) {


    var e = "<img class='charUnit' id='" + uID + "-mapSprite" + "' src='https://static.giantbomb.com/uploads/original/10/103881/2157564-poring.jpg' height='20px' width='20px'/>";
    
    console.log("util_generateCharacterDom", e);


    return e;
}



