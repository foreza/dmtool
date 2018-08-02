


var canvas;         // Reference to the canvas
var ctx;            // Reference to the context

var playerImg;
var monsterImg;

var charContainer;      // Bind to $('#characters-container');

var gameBoardState = {
    "inCombat" : true,
    "currentlySelected": null,
    "lastMoved": null,
    "combatState" : {
        "playerUnitCombatLoc" : [
            {
                "21pRlwom7G8dRhTMVfL5" : { 
                    "charIndex" : 0,
                    "x" :  15, 
                    "y" : 10 
                }
            }
        ],
        "otherUnitsCombatLoc" : [
            {
                "murloc" : { 
                    "x" :  15, 
                    "y" : 10, 
                    "size" : "tbd" } 
            }
        ]
    // },
    // exploreState : {
    //     playerUnitCombatLoc : [
    //         {
    //             player1 : { 
    //                 locX :  153, 
    //                 locY : 320 
    //             }
    //         }
    //     ],
    //     otherUnitsCombatLoc : [
    //         {
    //             murloc : { 
    //                 locX :  15, 
    //                 locY : 10, 
    //                 size : "tbd" } 
    //         }
    //     ]
    }
};


// ON DOM LOADED BIND EVENTS
$(function () {
    console.log("MapHelper ready!");

    // Assign references and set up context
    canvas = $("#mapCanvas").get(0);
    canvas.height = 400;
    canvas.width = 400;

    ctx = canvas.getContext("2d");
    playerImg = $("#playerSprite").get(0);
    monsterImg = $("#monsterSprite").get(0);
    charContainer = $('#characters-container');

    $("#mapCanvas").click(function (event) {
        console.log("click called on (global)" + event.pageX + ", " + event.pageY);
        // ctx.drawImage(monsterImg, util_calculateTrueX(event.pageX), util_calculateTrueY(event.pageY), 20, 20);
    });


    charContainer.on('click', '.move-btn', (e) => {
        alert("Moving this character: " + $(e.currentTarget).attr('data-fs-id'));
    })
});


// Terrible Gameloop, may be costly. Can switch to leverage sockets or something later on

setInterval(function () { counter() }, 1000);
function counter() {
    console.log("rendering");
    renderPlayerLocation();
    renderOtherUnitLocation();
}

function renderPlayerLocation() {

}


function renderOtherUnitLocation() {

}


function util_calculateTrueX(valX) {
    return valX - $("#mapCanvas").offset().left - 10;
}

function util_calculateTrueY(valY) {
    return valY - $("#mapCanvas").offset().top - 10;
}

// This function will take a character, NPC, or monster and make an attempt to render
function util_renderUnitOnMap(obj) {
    console.log("Rendering id: ", obj.id);

    if (gameBoardState.combatState.playerUnitCombatLoc[obj.id] != null){
        console.log("Location exists, rendering: " + obj.Name)
        ctx.drawImage(playerImg, gameBoardState.combatState.playerUnitCombatLoc[obj.id].x, gameBoardState.combatState.playerUnitCombatLoc[obj.id].y, 20, 20);
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