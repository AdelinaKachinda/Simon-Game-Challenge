// arrays to store all available colors, the pattern in which the game goes and the users choices 
var level = 0;
var gamePattern = [];
var started_to_toggle = true
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];


$(".btn").click(function (){
    // this function takes the users choice of color and stores it in an array
    
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    var last_index = userClickedPattern['length'] - 1
    //
    checkAnswer(last_index)

    // calls playsound using the user's colour whatever the user picks
    playsound(userChosenColour);

    //adds animation using a css class that sets a background colour
    animatePress(userChosenColour);
    
});

// calling next sequence when a key press has been detected in order to tell the user to start level 1
$(document).keyup(function () {

    if (started_to_toggle){     
        $("h1").text("Level " + level)    
        nextSequence()
        started_to_toggle = false
    };

})


function nextSequence(){ 

    //Increments the level of the game and displays it to the user
    level += 1 
    $("h1").text("Level " + level) 

    // Gives us a random number that generates a random colour from buttonColour 
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    
    //stores the order in which the colors have been randomly selected. Which is the sequence the computer chose 
    gamePattern.push(randomChosenColour);
    
    //enables the flashes when a button has been pressed
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    //calls playsound but using the random colourr the computer chose to show the user what button moved initially 
    playsound(randomChosenColour);

  
}

function playsound(name){
    // Enables us to play sound for whatever the user clicks on screen and whatever random value is chosen 

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play()

}


// checking if the user is correct
function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
            nextSequence()
            userClickedPattern = []
        }, 1000);
      }
    }


}


function animatePress(currentColour){
    // adds css class to color ids in order for a backgrouncolor 
    
    $("#" + currentColour).addClass("pressed")
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed")
    }, 100);

}

