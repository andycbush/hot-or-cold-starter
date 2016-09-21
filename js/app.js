// Step 1
//declare global variables

// var computerChoice = random generated number for user to guess
var computerChoice = generateRandomNumber(1, 100);
console.log(computerChoice);
// var oldGuess = 0 this will hold the historic value of previous guess to display
var oldGuess = 0;

// var counter = 30 this is the max number of guesses
var counter = 30;
$('#count').text(counter);

//Step 2
//declare the functions

//create a function to start a new game
function startNewGame() {
    //reload the page when you start a new game
    document.location.reload(true);
}

//generate random number
function generateRandomNumber(min, max) {
    var computerChoice = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
    // Math.Random generates a random number between 0 and 1. then mult by 100, add 1, then Math.floor rounds down.
    //this creates a random number between 1 and 100.
    return computerChoice;
}

//create a function to count number of guesses
function countGuesses(counter) {
    $('#count').text(counter);
}

//create a function to show history of guesses
function showGuessHistory(guessedNumber) {
    $('#guessList').append('<li>' + guessedNumber + '</li>');
}

//validate user input
function validateUserInput(guessedNumber) {

    //default = assuming the user input is valid (setting a FLAG to true)
    var userInputCorrectFlag = true;


    //at least 1 character
    while (guessedNumber.length < 1) {
        alert("Please enter a digit between 1 and 100");
        userInputCorrectFlag = false;
    }

    //no spaces
    while (guessedNumber.indexOf(' ') > 0) {
        alert("Please don't enter spaces. Enter a number.");
        userInputCorrectFlag = false;
    }

    //the userNumber should be a whole number
    while (Math.floor(guessedNumber) != guessedNumber) {
        alert("Please enter a whole number.")
        userInputCorrectFlag = false;
    }
    //the number must be between 1 and 100
    while ((guessedNumber < 1) || (guessedNumber > 100)) {
        alert('Please enter a number between 1 and 100!');
        userInputCorrectFlag = false;
    }

    //if the input validates, play the game
    if (userInputCorrectFlag == true) {
        counter--;
        userHint(computerChoice, guessedNumber);
        countGuesses(counter);
        showGuessHistory(guessedNumber);
        $('#userGuess').val('');
    }
}



//create a function to eval feedBack
function userHint(computerChoice, guessedNumber) {
    var numberDifference = Math.abs(guessedNumber - computerChoice);
    if (numberDifference >= 50) {
        $('#feedback').text('Ice Cold!');
    } else if (numberDifference >= 30 && numberDifference <= 49) {
        $('#feedback').text('Cold!');
    } else if (numberDifference >= 20 && numberDifference <= 29) {
        $('#feedback').text('Warm!');
    } else if (numberDifference >= 10 && numberDifference <= 19) {
        $('#feedback').text('Hot!');
    } else if (numberDifference >= 1 && numberDifference <= 9) {
        $('#feedback').text(' Very Hot!');
    } else {
        $('#feedback').text('You got it! Well done!');
    }
}



//use the functions

$(document).ready(function () {
    $('.new').on('click', startNewGame);

    $('#guessButton').on('click', function () {

        //first get the value entered in the input box by user
        var guessedNumber = $('#userGuess').val();

        //store it in the newGuess variable as well to serve the relative Feedback ("Hotter or Colder") functionality
        var newGuess = guessedNumber;

        //validate all the numbers
        validateUserInput(guessedNumber);

        if ((oldGuess !== 0) && (guessedNumber >= 1) && (guessedNumber <= 100)) {
            //call the relative feedback function defined above
            //relativeFeedback(computerChoice, oldGuess, newGuess);
        }
    });
    /*--- Display information modal box ---*/
    $(".what").click(function () {
        $(".overlay").fadeIn(1000);

    });

    /*--- Hide information modal box ---*/
    $("a.close").click(function () {
        $(".overlay").fadeOut(1000);
    });

});
