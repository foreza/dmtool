


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
        "playerUnitCombatLoc": [],
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
                characters[i].x = util_calculateTrueX(event.pageX, "mapCanvas");
                characters[i].y = util_calculateTrueY(event.pageY, "mapCanvas");
                renderAllPlayerLocation();
            }
        }

    });

    // Bind on click events to map Canvas
    $("#combatCanvas").click(function (event) {
        console.log("combat click called on (global)" + event.pageX + ", " + event.pageY);

        for (var i = 0; i < gameBoardState.combatState.playerUnitCombatLoc.length; ++i) {
            if (gameBoardState.currentlySelected === gameBoardState.combatState.playerUnitCombatLoc[i].id) {
                console.log('combat found id match, prior x/y: ' +
                    gameBoardState.combatState.playerUnitCombatLoc[i].x + ", " +
                    gameBoardState.combatState.playerUnitCombatLoc[i].y);
                gameBoardState.combatState.playerUnitCombatLoc[i].x = util_calculateDisplayXForCombatCanvas(util_calculateTrueX(event.pageX, "combatCanvas"), 40);
                gameBoardState.combatState.playerUnitCombatLoc[i].y = util_calculateDisplayYForCombatCanvas(util_calculateTrueY(event.pageY, "combatCanvas"), 40);
                console.log('combat found id match, new x/y: ' +
                    gameBoardState.combatState.playerUnitCombatLoc[i].x + ", " +
                    gameBoardState.combatState.playerUnitCombatLoc[i].y);
                renderAllPlayerCombatLocation();
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



    // Render + init on a timeout (temporary fix)
    setTimeout(function () {
        drawMapView();
    }, 1000);



});


function enterCombatState() {

    console.log("Entering combat state");
    $('#map-container').css("display", "none");
    $('#combat-container').css("display", "block");
    // populatePlayerUnitCombatLoc();
    renderAllPlayerCombatLocation();
    util_drawGridOnState(cCtx, 400, 400, 40);

}

function enterExploreState() {

    console.log("Entering explore state");
    $('#map-container').css("display", "block")
    $('#combat-container').css("display", "none")

}

// TODO: implement
function resetGameBoardLocations(ctx) {

    // On a new game, we want to set some defaults
    // This will also be used to 'clear' or 'restart' a session
    // If the ctx passed in is the explore context, we want to overwrite the player x / y with some default value
    // If the ctx passed in is the combat ctx, we want to overwrite the gameBoardState player x/ y with some default
    // Clicking this button at any time should trigger a warning modal

}


// TODO: implement
function getPlayerUnitCombatLoc(isTest) {

    var gb;     // Get the gameboard

    // Test mode, load local values
    if (isTest) {
        for (var i = 0; i < characters.length; ++i) {

            console.log('bing!');

            var cPos = {
                "id": characters[i].id,
                "x": i * 2,
                "y": i * 2
            }
            gameBoardState.combatState.playerUnitCombatLoc.push(cPos);
        }

    } else {
        // Load gameBoardState from firestore db
        // Grab each character loc x and y and store initial values
    }
    console.log(gameBoardState);

}


function renderAllPlayerCombatLocation() {

    cCtx.clearRect(0, 0, combatCanvas.width, combatCanvas.height);
    util_drawGridOnState(cCtx, 400, 400, 40);

    if (gameBoardState.combatState != null) {
        for (var i = 0; i < gameBoardState.combatState.playerUnitCombatLoc.length; ++i) {
            console.log("Rendering Combat loc!");
            util_drawImageFromCharContainer(cCtx, gameBoardState.combatState.playerUnitCombatLoc[i].id,
                util_adjustAndCenterDisplayForCombat(gameBoardState.combatState.playerUnitCombatLoc[i].x, 40),
                util_adjustAndCenterDisplayForCombat(gameBoardState.combatState.playerUnitCombatLoc[i].y, 40), 20, 20)
        }
    } else {
        console.log("Characters is null or empty");
    }

}

// Function called to draw/re-draw the view as needed
function drawMapView() {

    getPlayerUnitCombatLoc(true);
    renderAllPlayerLocation();
    renderAllPlayerCombatLocation();

}

// Render all player locations with the corresponding sprite
// Since we have to re-draw the exploreCanvas in order to 'erase', we will need to re-draw all game objects when a unit location is updated

function renderAllPlayerLocation() {

    eCtx.clearRect(0, 0, exploreCanvas.width, exploreCanvas.height);

    if (characters != null && characters.length > 0) {
        for (var i = 0; i < characters.length; ++i) {
            util_drawImageFromCharContainer(eCtx, characters[i].id, characters[i].x, characters[i].y, 40, 40)
        }
    } else {
        console.log("Characters is null or empty");
    }

}


// TODO: implement. Call to update other unit location
function renderOtherUnitLocation() {
}


function util_drawImageFromCharContainer(ctx, id, locX, locY, dimX, dimY) {

    if ($('.character[data-fs-id="' + id + '"]').children('img').get(0)){
        ctx.drawImage($('.character[data-fs-id="' + id + '"]').children('img').get(0), locX, locY, dimX, dimY);
    } else {
        // alert ('img not present, using preset default');

        var img = new Image;
        img.src = "https://cdn.wikimg.net/en/strategywiki/images/1/1d/Male_Supernovice_%28Ragnarok_Online%29.png";

        // var tmp = '<img class="avatar" src="https://cdn.wikimg.net/en/strategywiki/images/1/1d/Male_Supernovice_%28Ragnarok_Online%29.png">';
        ctx.drawImage(img, locX, locY, dimX, dimY);
    }

}


function util_calculateTrueX(valX, cv) {

    return valX - $("#" + cv).offset().left - 10;

}


function util_calculateTrueY(valY, cv) {

    return valY - $("#" + cv).offset().top - 10;

}


function util_calculateDisplayXForCombatCanvas(valX, scale) {

    console.log("valX/scale * scale:", Math.floor(valX / scale) * scale)
    return Math.floor(valX / scale);

}


function util_calculateDisplayYForCombatCanvas(valY, scale) {

    return Math.floor(valY / scale);

}


function util_adjustAndCenterDisplayForCombat(val, scale) {

    var value = ((val * scale) + scale / 4) > 0 ? ((val * scale) + scale / 4) : scale / 4;
    return value;

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
