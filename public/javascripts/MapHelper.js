


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

        for (var i = 0; i < characters.length; ++i) {
            if (gameBoardState.currentlySelected === characters[i].id){
                console.log('found id match');
                characters[i].x = util_calculateTrueX(event.pageX);
                characters[i].y = util_calculateTrueY(event.pageY);

            }
        }

    });


    charContainer.on('click', '.move-btn', (e) => {
        // alert("Moving this character: " + $(e.currentTarget).attr('data-fs-id'));
        console.log("$(e.currentTarget)", $(e.currentTarget));
        gameBoardState.currentlySelected = $(e.currentTarget).attr('data-fs-id');
        // TODO: Highlight the character who is currently being selected to move
    })
});


// Terrible Gameloop, may be costly. Can switch to leverage sockets or something later on

setInterval(function () { counter() }, 200);
function counter() {
    // util_printBoardState();     
    renderPlayerLocation();
    renderOtherUnitLocation();
}


// TODO: implement. Call to update player location
function renderPlayerLocation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < characters.length; ++i) {
        ctx.drawImage($("#"+characters[i].id+"sprite").get(0), characters[i].x, characters[i].y, 40, 40);
            
        
    }

}

// TODO: implement. Call to update other unit location
function renderOtherUnitLocation() {
}


function util_createImageRenderDom(pid, src){

    console.log("DOM insertion for: ", src);

    if (src != "" && src != null){
        $("#map-container").append('<img id="' + pid + "sprite" +
        '" style="visibility:hidden" src="' + src +
        '" alt="Player" width="20" height="20">');
    } else {
        $("#map-container").append('<img id="' + pid + "sprite" + '" style="visibility:hidden" src="https://cdn.wikimg.net/en/strategywiki/images/1/1d/Male_Supernovice_%28Ragnarok_Online%29.png" alt="Player" width="20" height="20">')
    }

   
}

function util_calculateTrueX(valX) {
    return valX - $("#mapCanvas").offset().left - 10;
}

function util_calculateTrueY(valY) {
    return valY - $("#mapCanvas").offset().top - 10;
}

// // This function will take a character, NPC, or monster and make an attempt to render
// function util_renderUnitOnMap(obj) {
//     console.log("Rendering id: ", obj.id);
//     // ctx.drawImage(playerImg, obj.x, obj.y, 40, 40);

//     // TODO: use the player's image if they have one. otherwise, use the default one here
    
// }

function util_printBoardState() {
    console.log("Board State: " + 
    "Selected:" + gameBoardState.currentlySelected
    
    
    );
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