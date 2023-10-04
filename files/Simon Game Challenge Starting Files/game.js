//Beginning Initialisation
var colorButtons = ["red","blue","green","yellow"];

var gamePattern = [];
var userPattern = [];

var level = 0;
var started = false;
//responds to any key and starts the game
$(document).keypress(function(){
   if(!started){
    $("#level-title").text("level "+level)  ;
    nextSequence();
    started = true;
   }
});
// Produces a random color and fadein-out animation will be presented on screen for user to know which color to press with sound 
function nextSequence(){
    userPattern = [];
    level++;
    $("#level-title").text("level "+level);

    var randomValue = Math.floor(Math.random()*4);
    var randomColor = colorButtons[randomValue];
    gamePattern.push(randomColor);

    $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    PlaySound(randomColor);
}
//Helps you to play Sounds
function PlaySound (name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}
//This is for the user to click any color and it get stored in userPattern array
$(".btn").click(function(){
  var userColor = $(this).attr("id");
  userPattern.push(userColor);
  
  PlaySound(userColor);
  animatePress(userColor);

checkAnswer(userPattern.length-1);
});
//Helps you in animation of fadein-out
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}
//The function which basically checks all the conditions and controls the flow of program
function checkAnswer(currentLevel){
    if(userPattern[currentLevel]===gamePattern[currentLevel]){
        if(userPattern.length===gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }
    else{
        PlaySound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

function startOver(){
    gamePattern=[];
    level = 0;
    started = false;
}