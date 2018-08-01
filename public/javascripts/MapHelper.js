


var canvas;         // Reference to the canvas
var ctx;            // Reference to the context

var playerImg;
var monsterImg;



// var gameBoardState = {

//     inCombat : True,
//     currentlySelected: Null,
//     lastMoved: Null,
//     combatState : {
//         playerUnitCombatLoc : [
//             {
//                 player1 : { 
//                     locX :  15, 
//                     locY : 10 
//                 }
//             }
//         ],
//         otherUnitsCombatLoc : [
//             {
//                 murloc : { 
//                     locX :  15, 
//                     locY : 10, 
//                     size : "tbd" } 
//             }
//         ]
//     },
//     exploreState : {
//         playerUnitCombatLoc : [
//             {
//                 player1 : { 
//                     locX :  153, 
//                     locY : 320 
//                 }
//             }
//         ],
//         otherUnitsCombatLoc : [
//             {
//                 murloc : { 
//                     locX :  15, 
//                     locY : 10, 
//                     size : "tbd" } 
//             }
//         ]
//     }
// }
    

// ON DOM LOADED BIND EVENTS
$(function() {
    console.log( "MapHelper ready!" );

    // Assign references and set up context
    canvas = $("#mapCanvas").get(0);
    canvas.height = 400;
    canvas.width = 400;

    ctx = canvas.getContext("2d");
    playerImg = $("#playerSprite").get(0);
    monsterImg = $("#monsterSprite").get(0);

    $("#mapCanvas").click(function(event) {
        console.log( "click called on" + util_calculateTrueX(event.pageX) + ", " + util_calculateTrueY(event.pageY));
        ctx.drawImage(monsterImg, util_calculateTrueX(event.pageX),util_calculateTrueY(event.pageY), 20, 20);
      });
});


// Terrible Gameloop, may be costly. Can switch to leverage sockets or something later on

setInterval(function() { counter() }, 1000);
function counter()
{
    console.log("rendering");
    renderPlayerLocation();
    renderOtherUnitLocation();}

function renderPlayerLocation() {

}


function renderOtherUnitLocation(){

}


function util_calculateTrueX(valX) {
    return valX - $("#mapCanvas").offset().left;
}

function util_calculateTrueY(valY){
    return valY - $("#mapCanvas").offset().top;
}

function doMouseDown() {
    alert("clicked");
}