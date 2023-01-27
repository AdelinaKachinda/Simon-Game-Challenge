// arrays to store all available colors, the pattern in which the game goes and the users choices 
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];


$(".btn").click(function (){
    // this function takes the users choice of color and stores it in an array
    
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    // calls playsound using the user's colour whatever the user picks
    playsound(userChosenColour);

    //adds animation using a css class that sets a background colour
    animatePress(userChosenColour);
    
});


function nextSequence(){
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



function animatePress(currentColour){
    // adds css class to color ids in order for a backgrouncolor 
    
    $("#" + currentColour).addClass("pressed")
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed")
    }, 100);

}


