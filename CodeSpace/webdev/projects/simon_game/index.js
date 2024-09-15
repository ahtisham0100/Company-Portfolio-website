// Declare arrays and game variables
var userArray = [];
var randomArray = [];
let started = false;
var level = 1;
var clickId = 0;
let colors = ["green", "red", "blue", "yellow"];


//for cell phone 
$("#level-title").click( ()=> {
    randomArray = [];
    userArray = [];
    level = 1; // Ensure that level starts at 1
    clickId=0;  //reset click id to zero incase user clicks before game starts
    $("#level-title").text("Level " + level);
    alert("Game Started");
    Sequence();

    $("div.container").removeClass("game-over");
    started = true; // Only set started to true inside this block
    console.log("Game started: " + started);
})
// If game is not started, listen for keypress to start the game
$(document).keypress(function() {
    if (!started) {
        randomArray = [];
        userArray = [];
        level = 1; // Ensure that level starts at 1
        clickId=0;  //reset click id to zero incase user clicks before game starts
        $("#level-title").text("Level " + level);
        alert("Game Started");
        Sequence();

        $("div.container").removeClass("game-over");
        started = true; // Only set started to true inside this block
    }
    console.log("Game started: " + started);
});

// Handle button clicks
$(".btn").click(function() {
    
    // Get the clicked button's color ID
    var userChosenColour = $(this).attr("id");

    // Add clicked color to user's array
    userArray.push(userChosenColour);
    console.log("User Array updated: " + userArray);

    // Animate and play sound for the clicked color
    $("#" + userChosenColour).fadeIn(50).fadeOut(50).fadeIn(100);
    playSound(userChosenColour);
    keypress(userChosenColour);
   ++clickId;
    // Check the user's input after each click
    checkFunction(userChosenColour, clickId);
});


// Check if the user input matches the random sequence
function checkFunction(userChosenColour, clickId) {
var length =  randomArray.length;
    console.log("inside the check function ..disabling click and random array length is :"+ length+"click id :"+ clickId)
    $(".btn").click(false);

    // Check if user is on the last element of the sequence
    if (clickId === randomArray.length) {
        console.log("inside theclickId === randomArray.length function ..disabling click "); 

        // Check if the last element is correct
        if (userChosenColour === randomArray[clickId - 1]) {
            console.log("Good shot! Completed sequence at index: " + clickId);
            level++;  // Move to the next level

            // Delay starting the next sequence
            setTimeout(() => {
                clickId = 0; // Reset clickId for the new level
                Sequence();  // Start the new sequence
            }, 2000);

        } else {
            gameOver(); // Incorrect input, trigger game over
        }
      
    } 
    // Check if user is clicking through intermediate elements
    else if (clickId < randomArray.length) {
        
        if (userChosenColour === randomArray[clickId - 1]) {
            console.log("Correct choice at index: " + (clickId - 1));
        } else {
            gameOver(); // Incorrect input, trigger game over
        }

    } 
    console.log("Moving out of check click enabled ");
    $('selector').click(true);

}


// Generate and replay sequence
function Sequence() {
    console.log("Generating new sequence for level " + level);
    $("#level-title").text("Level " + level); // Update level title

    if (level === 1) {
        // For level 1, generate and play the first random color
        var colorId = colors[Math.floor(Math.random() * 4)];
        playSound(colorId);
        keypress(colorId);
        $("#" + colorId).fadeIn(50).fadeOut(50).fadeIn(100);
        randomArray.push(colorId); // Push to randomArray
        console.log("Random sequence at level 1: " + randomArray);
    } else if (level > 1) {
        // Replay the existing sequence with a delay
        function replaySequence(i) {
            if (i < randomArray.length) {
                var tempColor = randomArray[i];
                playSound(tempColor);
                keypress(tempColor);
                $("#" + tempColor).fadeIn(50).fadeOut(50).fadeIn(100);

                setTimeout(function() {
                    replaySequence(i + 1); // Call the next step after 1 second
                }, 1000);
            } else {
                // After replaying the old sequence, add a new random color
                var newColorId = colors[Math.floor(Math.random() * 4)];
                playSound(newColorId);
                keypress(newColorId);
                $("#" + newColorId).fadeIn(50).fadeOut(50).fadeIn(100);
                randomArray.push(newColorId); // Push new color to randomArray
                clickId=0;
                console.log("New sequence: " + randomArray + "click id "+clickId);
            }
        }
        replaySequence(0); // Start replaying the sequence
    }
}

// Play sound function
function playSound(id) {
    var address = "sounds/" + id + ".mp3";
    var audio = new Audio(address);
    audio.play();
}

// Animate button press
function keypress(id) {
    $("#" + id).addClass("pressed");
    setTimeout(function() {
        $("#" + id).removeClass("pressed");
    }, 500);
}

// Game over function
function gameOver() {
    $("div.container").addClass("game-over");
    $("h1").text("Game Over!");
    $("div.btn").hide();
    $("div").html("<h1>\n Refresh / Click Here to play again</h1>");
    $("div").click( ()=>{
        location.reload();
    }) ;
    var userArray = [];
    var randomArray = [];
    let started = false;
    var level = 1;
    var clickId = 0;

    console.log("Game Over. Arrays reset: " + userArray + randomArray);

}
