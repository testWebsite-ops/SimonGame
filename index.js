var buttonsArray = ["green", "red", "yellow", "blue"];
var simonSequence = [];
var currentLevel = 0;
// temp = variable to keep time interval function at check
var temp = 0;
var validator = 0;
var playerArray = [];
var game;
// true means not started and false means started
var gameStatus = true;

// ****************************************************************

// function for when a tile simulates a click
function tileClicked(tile) {
  var audio = new Audio("sounds/" + tile + ".mp3");
  audio.play();
  $("#" + tile).toggleClass("pressed");
  setTimeout(function () {
    $("#" + tile).toggleClass("pressed");
  }, 50);
}

// function for when a tile is clicked by the user
function tileUserClicked(tile, array) {
  var audio = new Audio("sounds/" + tile + ".mp3");
  audio.play();
  $("#" + tile).toggleClass("pressed");
  setTimeout(function () {
    $("#" + tile).toggleClass("pressed");
  }, 50);
  array.push(tile);
}

// function for when a new squence is created
function newSequence(array, arrayLength, sequenceArray) {
  for (i = 0; i < 1; i++) {
    var randomNumber = Math.floor(Math.random() * arrayLength);
    var randomColour = array[randomNumber];
    sequenceArray.push(randomColour);
  }
  levelCounter(currentLevel);
  $("h1").text("level " + currentLevel);
  playerArray = [];
}

// function for playing/animating the sequence generated
function playSequence() {
  if (temp < simonSequence.length) {
    tileClicked(simonSequence[temp]);
    temp++;
  } else {
    clearInterval(game);
    temp = 0;
    console.log("interval finished");
  }
}

function restart() {
  gameStatus = true;
  simonSequence = [];
  currentLevel = 0;
}

function checkUserInput(userArray, sequenceArray) {
  if (validator < sequenceArray.length) {
    if (userArray[validator] === sequenceArray[validator]) {
      validator++;
    } else {
      $("html, body").animate({ scrollTop: 0 });
      validator = 0;
      console.log("you lost sucker");
      restart();
      var gameOver = new Audio("sounds/wrong.mp3");
      $("body").toggleClass("wrong");
      $("h1").text("Game Over, Press Any Key to Restart");
      setTimeout(function () {
        $("body").toggleClass("wrong");
        gameOver.play();
      }, 100);
    }
  }
}

function nextLevel(sequenceArray) {
  console.log(playerArray.length, sequenceArray.length);
  if (playerArray.length === sequenceArray.length) {
    console.log("you won");
    newSequence(buttonsArray, buttonsArray.length, simonSequence);
    console.log(simonSequence);
    game = setInterval(playSequence, 1000);
    validator = 0;
  }
}

function start() {
  game = setInterval(playSequence, 1000);
}

function levelCounter(level) {
  // if correct = new newSequence
  // else reset
  level += 1;
  currentLevel = level;
}

// ****************************************************************

$("#red").on("click", function () {
  tileUserClicked($(this).attr("id"), playerArray);
  checkUserInput(playerArray, simonSequence);
  nextLevel(simonSequence);
});

$("#green").on("click", function () {
  tileUserClicked($(this).attr("id"), playerArray);
  checkUserInput(playerArray, simonSequence);
  nextLevel(simonSequence);
});

$("#blue").on("click", function () {
  tileUserClicked($(this).attr("id"), playerArray);
  checkUserInput(playerArray, simonSequence);
  nextLevel(simonSequence);
});

$("#yellow").on("click", function () {
  tileUserClicked($(this).attr("id"), playerArray);
  checkUserInput(playerArray, simonSequence);
  nextLevel(simonSequence);
});

$(document).on("keydown", function () {
  if (gameStatus === true) {
    newSequence(buttonsArray, buttonsArray.length, simonSequence);
    start(currentLevel);
    gameStatus = false;
  } else {
    console.log("game has started");
  }
});

$(document).on("click", function () {
  if (gameStatus === true) {
    newSequence(buttonsArray, buttonsArray.length, simonSequence);
    start(currentLevel);
    gameStatus = false;
  } else {
    console.log("game has started");
  }
});
