

var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var start = true;

$(document).keypress(function() {
    if(start)
        nextSequence();
    start = false;
});


$(".btn").click(function (){
    var userChosenColour = $(this).attr("id");
    
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);

    var ele = this;
    playSound(userChosenColour);

    animatePress(ele);
    var idx = userClickedPattern.length - 1;
    if(userClickedPattern[idx] === gamePattern[idx])
    {
        if(idx+1 === gamePattern.length)
            checkAnswer(idx);
    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
});

function startOver()
{
    gamePattern = [];
    level = 0;
    start = true;
}


function checkAnswer(index)
{
    var correct = true;
    for(let i = 0; i<=index; i++)
    {
        if(gamePattern[i] !== userClickedPattern[i])
        {
            correct = false;
            break;
        }
    }

    if(correct)
    {
        userClickedPattern = [];
        setTimeout(function () {
            nextSequence()
        },1000);
    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }


}

function playSound(element)
{
    var audio = new Audio("sounds/" + element + ".mp3");
    audio.play();
}

function animatePress(ele)
{
    $(ele).addClass("pressed");

    setTimeout(function(){
        $(ele).removeClass("pressed");
    },100);
}


function nextSequence()
{
    var randomNumber = Math.floor(Math.random()*4);


    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

    level++;
    $("#level-title").text("Level " + level);
}


