// Questions
var questionArray = [
    "Who sang that 'Girls Just Want to Have Fun'?",
    "Which Bangles song was number one in the year of 1987?",
    "What famous musician starred in the movie 'The Labyrinth'?"
 ]

// Choice Answers
var choicesArray = [
    ["Phil Collins", "Micheal Jackson", "Blonde", "Cyndi Lauper"], 
    ["Manic Monday", "Walk Like an Egyptian", "Eternal Flame", "If She Knew What She Wants"],
    ["David Bowie", "Jon Bon Jovi", "Dan Aykroyd", "Cher"]
]

// Images
var imageArray = [
    "<img src='./assets/images/lauper.jpg'>",
    "<img src='./assets/images/bangles.jpg'>",
    "<img src='./assets/images/bowie.jpg'>"
]

// Answers
var correctAnswers = [
    "Cyndi Lauper",
    "Walk Like an Egyptian",
    "David Bowie"
];

// showing questions
var trivQs = questionArray[Math.floor];
    document.questionArray = trivQs;

// counting
var questionCounter = 0;
var correctTally = 0;
var incorrectTally = 0;
var timerId;
var choiceAnswer;
var timeCounter;
var timeLeft = 30;

// start page with timer and first question
runQuestion(questionCounter);
runTimer();
// run timer
function runTimer() {
    var elem = document.getElementById('timeCounter');
    if (timerId) {
        timeLeft = 30
        clearInterval(timerId);
    }
    timerId = setInterval(countdown, 1000);
    function countdown() {
        if (timeLeft == -1) {
            clearTimeout(timerId);
            timeLeft = 30
            selectAnswer(-1);
        } else {
            elem.innerHTML = timeLeft;
            timeLeft--;
        }
    }
}

// Show question
function runQuestion (questionNumber) {
    var box = document.getElementById('questionBox');
    box.innerHTML = questionArray[questionNumber];
    
    var buttons = ''
    choicesArray[questionNumber].forEach(function (item, index) {
    buttons += '<li><button onClick="selectAnswer(' + index + ')">' + item + '</button></li>'
        
    })
    $('.choices ul').html(buttons);
}

//person chooses their choice
function selectAnswer(index) {
	// answering question
	if(index == -1 || choicesArray[questionCounter][index] == correctAnswers[questionCounter]) {
        correctTally += 1;
        generateWin();
    } else {
        incorrectTally += 1;
        generateLoss();
    }
    if(questionCounter == questionArray.length -1) {
        clearInterval(timeCounter);
        $('#mainArea').hide();
        $('#score').show();
        var scoreHtml = '<p>You got</p>' +
            '<ul>' +
                '<li>' + correctTally + ' right answer(s)</li>' +
                '<li>' + incorrectTally + ' wrong answer(s)</li>' +
            '</ul>' +
            '<button onClick="resetGame()">Start a new game</button>';
        $('#score').html(scoreHtml);
	} else {
        // move onto the next question
        questionCounter += 1;
        clearInterval(timerId);
        runQuestion(questionCounter);
        runTimer();
	}
}

// person chooses correct answer
// correct answer tally
function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timeCounter'>" + timeLeft + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$("#info").html(gameHTML);
	setTimeout(runTimer, 10000); 
}

// person chooses incorrect answer
// incorrect tally
function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timeCounter'>" + timeLeft + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$("#info").html(gameHTML);
	setTimeout(runTimer, 10000);
}

// person runs out of time
// Ran out of time - incorrect tally
function generateLossDueToTimeOut() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timeCounter'>" + timeLeft + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter];
	$("#info").html(gameHTML);
	setTimeout(runTimer, 10000);  
}

// reset the game when finished
function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
    runQuestion(questionCounter);
    $('#score').hide();
    $('#mainArea').show();
}