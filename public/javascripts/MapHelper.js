


var exploreCanvas;         // Reference to the exploreCanvas
var eCtx;                   // Reference to the context for the exploreCanvas

var combatCanvas;           // Reference to the combatCanvas
var cCtx;                   // Reference to the context for the combat canvas

var playerImg;
var monsterImg;

var charContainer;          // Bind to $('#characters-container');
var toggleSelect;

var gameBoardState = {
    "inCombat": false,
    "currentlySelected": null,
    "lastMoved": null,
    "combatState": {
        "playerUnitCombatLoc": [
            {
                "21pRlwom7G8dRhTMVfL5": {
                    "charIndex": 0,
                    "x": 15,
                    "y": 10
                }
            }
        ],
        "otherUnitsCombatLoc": [
            {
                "murloc": {
                    "x": 15,
                    "y": 10,
                    "size": "tbd"
                }
            }
        ]
    }
};


// ON DOM LOADED BIND EVENTS
$(function () {
    console.log("MapHelper ready!");

    // Assign references and set up context for exploration
    exploreCanvas = $("#mapCanvas").get(0);
    exploreCanvas.height = 400;
    exploreCanvas.width = 400;

    // Assign references and set up context for combat
    combatCanvas = $("#combatCanvas").get(0);
    combatCanvas.height = 400;
    combatCanvas.width = 400;

    eCtx = exploreCanvas.getContext("2d");
    cCtx = combatCanvas.getContext("2d");

    playerImg = $("#playerSprite").get(0);
    monsterImg = $("#monsterSprite").get(0);
    charContainer = $('#characters-container');
    toggleSelect = $('#toggle-mode');


    // Bind on click events to map Canvas
    $("#mapCanvas").click(function (event) {
        console.log("click called on (global)" + event.pageX + ", " + event.pageY);

        for (var i = 0; i < characters.length; ++i) {
            if (gameBoardState.currentlySelected === characters[i].id) {
                console.log('found id match, prior x: ' + characters[i].x);
                characters[i].x = util_calculateTrueX(event.pageX);
                characters[i].y = util_calculateTrueY(event.pageY);
                renderAllPlayerLocation();
            }
        }

    });


    charContainer.on('click', '.move-btn', (e) => {
        // alert("Moving this character: " + $(e.currentTarget).attr('data-fs-id'));
        console.log("$(e.currentTarget)", $(e.currentTarget));
        gameBoardState.currentlySelected = $(e.currentTarget).attr('data-fs-id');
        // TODO: Highlight the character who is currently being selected to move        
    })

    toggleSelect.on('click', function () {
        console.log("Toggle was clicked.");

        // State change the game board
        gameBoardState.inCombat = !gameBoardState.inCombat;

        if (gameBoardState.inCombat) {
            enterCombatState();
        } else {
            enterExploreState();
        }
    });



    // Render on a timeout (temporary fix)
    setTimeout(function () { renderAllPlayerLocation() }, 2000);
});


function enterCombatState() {
    console.log("Entering combat state");
    $('#map-container').css("display", "none");
    $('#combat-container').css("display", "block");
    renderAllPlayerCombatLocation
    util_drawGridOnState(cCtx, 400, 400, 40);

}

function enterExploreState() {
    console.log("Entering explore state");
    $('#map-container').css("display", "block")
    $('#combat-container').css("display", "none")
    // util_drawGridOnState(eCtx, 400, 400, 10);

}



function renderAllPlayerCombatLocation(){
    console.log("renderAllPlayerCombatLocation!");


}



// Render all player locations with the corresponding sprite
// Since we have to re-draw the exploreCanvas in order to 'erase', we will need to re-draw all game objects when a unit location is updated

function renderAllPlayerLocation() {
    console.log("renderAllPlayerLocation!");
    eCtx.clearRect(0, 0, exploreCanvas.width, exploreCanvas.height);
    // util_drawGridOnState(eCtx, 400, 400, 20);


    if (characters != null && characters.length > 0) {
        for (var i = 0; i < characters.length; ++i) {
            console.log("Rendering!");
            eCtx.drawImage($("#" + characters[i].id + "sprite").get(0), characters[i].x, characters[i].y, 40, 40);
        }
    } else {
        console.log("Characters is null or empty");
    }


}


// TODO: implement. Call to update other unit location
function renderOtherUnitLocation() {
}


function util_createImageRenderDom(pid, src) {

    console.log("DOM insertion for: ", src);

    if (src != "" && src != null) {
        $("#sprite-container").append('<img id="' + pid + "sprite" +
            '" style="visibility:hidden" src="' + src +
            '" alt="Player" width="20" height="20">');
    } else {
        $("#sprite-container").append('<img id="' + pid + "sprite" + '" style="visibility:hidden" src="https://cdn.wikimg.net/en/strategywiki/images/1/1d/Male_Supernovice_%28Ragnarok_Online%29.png" alt="Player" width="20" height="20">')
    }


}

function util_calculateTrueX(valX) {
    return valX - $("#mapCanvas").offset().left - 10;
}

function util_calculateTrueY(valY) {
    return valY - $("#mapCanvas").offset().top - 10;
}




function util_printBoardState() {
    console.log("Board State: " +
        "Selected:" + gameBoardState.currentlySelected


    );
}

// This function assumes tile sizes are 25x25 (on the 400 by 400 scale), which will represent 5x5 on a 50x50 grid
// If the specified grid is not divisible by 5 it will take the floor
function util_drawGridOnState(ctx, height, width, scale) {

    for (var i = 0; i < height; i += scale) {
        for (var j = 0; j < width; j += scale) {
            ctx.rect(i, j, scale, scale);
            ctx.stroke();
        }
    }

}

function doMouseDown() {
    alert("clicked");
}


// Sample

/*


HP:"20"
Level:"1"
Mana:"10"
MaxHP:"20"
MaxMana:"10"
Name:"John Doe"
Race:"Elf"
id:"21pRlwom7G8dRhTMVfL5"


*/