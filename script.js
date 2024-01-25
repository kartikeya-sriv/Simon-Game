var userclickedpattern = [];
var gamepattern = [];
var level = 0;
var started = false;
$(document).keypress(function(){
    if(!started){
        nextsequence();
        started = true;
    }
})

$(".btn").on("click", function(){
    var userchosencolor = $(this).attr('id');
    userclickedpattern.push(userchosencolor);
    playsound(userchosencolor);
    buttonanimation(userchosencolor);
    check(userclickedpattern.length - 1);
})

function nextsequence(){
    $("h1").text("Level " + level);
    var randomnumber = Math.floor(Math.random() * 4);
    var arr = ["green", "red", "yellow", "blue"];
    var chosencolor = arr[randomnumber];
    console.log(chosencolor);
    gamepattern.push(chosencolor);
    $("#" + chosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(chosencolor);
    level++;
}

function playsound(color){
    var sound = new Audio("sounds/" + color + ".mp3");
    sound.play();
}

function buttonanimation(color){
    $("." + color).addClass("pressed");
    setTimeout(function(){
        $("." + color).removeClass("pressed");
    })
}

function check(currentindex){
    if(gamepattern[currentindex] == userclickedpattern[currentindex]){
        if(gamepattern.length === userclickedpattern.length){
            setTimeout(function(){
                userclickedpattern.length = 0;
                nextsequence();
            }, 1000);
        }
    }
    else gameover();
}

function gameover(){
    playsound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startover();
}

function startover(){
    level = 0;
    started = false;
    gamepattern.length = 0;
    userclickedpattern.length = 0;
}
