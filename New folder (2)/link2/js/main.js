var game = new Phaser.Game(1440, 960, Phaser.CANVAS, 'gameDiv');


function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
   	});
    return vars;
}

var creditunion = getUrlVars()["cuName"];
creditunion = decodeURIComponent(creditunion);

var creditunionlogo = getUrlVars()["cuLogo"];
var creditunionlogoURL = decodeURIComponent(creditunionlogo);

console.log("creditunionlogo = " + creditunionlogo);
console.log("creditunionlogoURL = " + creditunionlogoURL);

var achievementtypeID = getUrlVars()["achievementtype_id"];
achievementtypeID = decodeURIComponent(achievementtypeID);
var objectID = getUrlVars()["object_id"];
objectID = decodeURIComponent(objectID);

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('title', titleState);
game.state.add('game', gameState);

game.state.start('boot');