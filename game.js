// initializes the user's game level
var level = 0;

// arrays to store all available colors, the pattern in which the game goes and the users choices 
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];


$(".btn").click(function (){

    // gets the colour id of the users choice and stores it in the array 
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    var last_index = userClickedPattern['length'] - 1

    // calls this function to check if the user's answer was correct or wrong
    checkAnswer(last_index)

    // calls playsound using the user's colour in order to play its respctive audio
    playsound(userChosenColour);

    //adds animation using a css class that sets a background animation on the buttons
    animatePress(userChosenColour);
    
});

// This function calls next sequence and shows that the game has started
function newGame(){

    // This is used to detect a keyboard press in javascript
    var started_to_toggle = true
    $(document).keyup(function () {

        if (started_to_toggle){     
            $("h1").text("Level " + level)    
            nextSequence()
            started_to_toggle = false
    };
})

}

newGame()


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


// checking if the user is correct and sets up  the game functionality 
function checkAnswer(currentLevel){

    // This checks if the user's selection was correct according to the the computer's selection
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
      if (userClickedPattern.length === gamePattern.length){

        // Set timeout calls next sequence in intervals to ensure the game keeps going as long as the user is correct
        setTimeout(function(){
            nextSequence()
            userClickedPattern = []
        }, 900);
      }
      
      // This only runs when the user gets the sequence wrong
    }else{

        // Plays the audio for a wrong choice
        var wrong = new Audio("sounds/wrong.mp3")
        wrong.play()

        /* Adds a class to the body which causes a flash of a red background when the user is wrong.
            It does this in a set interval of 70 miliseconds 
        */
        
        $("body").addClass("game-over")
        setTimeout(function(){
            $("h1").text("Game Over, press any key to restart")
            $("body").removeClass("game-over")
        }, 70);

       
        // Restarts the game by calling the game initializer and reinitializes all the arrays to empty for a new game
        newGame()
        level = 0
        gamePattern = []
        userClickedPattern = []
        
        
    }

}


function animatePress(currentColour){
    // adds css class to color ids in order for a backgroun flash color on the buttons when they are pressed 
    
    $("#" + currentColour).addClass("pressed")
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed")
    }, 100);

}

