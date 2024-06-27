var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0; 

var startedGame = false; 

$(document).on("keydown", function () {
    if (startedGame === false) {
        nextSequence();
        startedGame = !startedGame; 
    } else {
        console.log(startedGame);
    }
})

$(".btn").on("click", function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer (userClickedPattern.length-1); 
    }
)


function nextSequence () {

    userClickedPattern = []; 

    var randomNumber =  Math.floor((Math.random()) * 4);

    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

    level++; 

    $("h1").text("Level " + level);

}

function playSound (name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress (currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer (currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success"); 
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000); 

        }
    } else {
        var wrong = true; 
        console.log("wrong")
        playSound("wrong"); 
        $("body").addClass("game-over"); 
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200)
        $("h1").text("Game Over. Press any key to restart.")
        startOver(); 
    }
}

function startOver () {
    level = 0;
    gamePattern = []; 
    startedGame = false; 

}




    
    