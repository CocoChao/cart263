"use strict";

/*****************

Slamina
rraB nippiP
Modified by:
oahC eloraC

A simple guessing game based on voice synthesis. The computer reads out an
animal name, but it reads it backwards. The user selects the animal they
think it is and either gets it right or wrong. If right, a new level is generated.
If wrong, the voice reads it out again.

Uses:

ResponsiveVoice
https://responsivevoice.org/

Animal names from:
https://github.com/dariusk/corpora/blob/master/data/animals/common.json

******************/

// An array of animal names that we use to create our guessing game
let animals = [
  "aardvark",
  "alligator",
  "alpaca",
  "antelope",
  "ape",
  "armadillo",
  "baboon",
  "badger",
  "bat",
  "bear",
  "beaver",
  "bison",
  "boar",
  "buffalo",
  "bull",
  "camel",
  "canary",
  "capybara",
  "cat",
  "chameleon",
  "cheetah",
  "chimpanzee",
  "chinchilla",
  "chipmunk",
  "cougar",
  "cow",
  "coyote",
  "crocodile",
  "crow",
  "deer",
  "dingo",
  "dog",
  "donkey",
  "dromedary",
  "elephant",
  "elk",
  "ewe",
  "ferret",
  "finch",
  "fish",
  "fox",
  "frog",
  "gazelle",
  "gila monster",
  "giraffe",
  "gnu",
  "goat",
  "gopher",
  "gorilla",
  "grizzly bear",
  "ground hog",
  "guinea pig",
  "hamster",
  "hedgehog",
  "hippopotamus",
  "hog",
  "horse",
  "hyena",
  "ibex",
  "iguana",
  "impala",
  "jackal",
  "jaguar",
  "kangaroo",
  "koala",
  "lamb",
  "lemur",
  "leopard",
  "lion",
  "lizard",
  "llama",
  "lynx",
  "mandrill",
  "marmoset",
  "mink",
  "mole",
  "mongoose",
  "monkey",
  "moose",
  "mountain goat",
  "mouse",
  "mule",
  "muskrat",
  "mustang",
  "mynah bird",
  "newt",
  "ocelot",
  "opossum",
  "orangutan",
  "oryx",
  "otter",
  "ox",
  "panda",
  "panther",
  "parakeet",
  "parrot",
  "pig",
  "platypus",
  "polar bear",
  "porcupine",
  "porpoise",
  "prairie dog",
  "puma",
  "rabbit",
  "raccoon",
  "ram",
  "rat",
  "reindeer",
  "reptile",
  "rhinoceros",
  "salamander",
  "seal",
  "sheep",
  "shrew",
  "silver fox",
  "skunk",
  "sloth",
  "snake",
  "squirrel",
  "tapir",
  "tiger",
  "toad",
  "turtle",
  "walrus",
  "warthog",
  "weasel",
  "whale",
  "wildcat",
  "wolf",
  "wolverine",
  "wombat",
  "woodchuck",
  "yak",
  "zebra"
];

// We need to track the correct button for each round
let $correctButton;
// We also track the set of buttons
let buttons = [];
// How many possible answers there are per round
const NUM_OPTIONS = 5;
// Variable to track score
let score = 0;

// Commands that annyang should listen to
let commands = {
  'I give up': giveUpGuess,
  'Say it again': sayAgain,
  'I think it is *name': handleGuess
};

$(document).ready(setup);

// setup()
//
// Start game, make annyang follow the commands and add annyang to
//start listening.
function setup() {
  if (annyang){
    annyang.addCommands(commands);
    annyang.start();
  }
  newRound();

}

function sayAgain(){
    sayBackwards($correctButton.text());
}

// newRound()
//
// Generates a set of possible answers randomly from the set of animals
// and adds buttons for each one. Then chooses the correct button randomly.
function newRound() {
  // We empty the buttons array for the new round
  buttons = [];
  // Loop for each option we'll offter
  for (let i = 0; i < NUM_OPTIONS; i++) {
    // Choose the answer text randomly from the animals array
    let name = getRandomElement(animals);
    // Add a button with this label
    let $button = addButton(name);
    // Add this button to the buttons array
    buttons.push($button);

  }

  // Choose a random button from the buttons array as our correct button
  $correctButton = getRandomElement(buttons);
  // Say the label (text) on this button
  sayBackwards($correctButton.text());
}

// sayBackwards(text)
//
// Uses ResponsiveVoice to say the specified text backwards!
function sayBackwards(text) {
  // We create a reverse version of the name by:
  // 1. using .split('') to split the string into an array with each character
  // as a separate element.
  // e.g. "bat" -> ['b','a','t']
  // 2. using .reverse() on the resulting array to create a reverse version
  // e.g. ['b','a','t'] -> ['t','a','b']
  // 3. using .join('') on the resulting array to create a string version of the array
  // with each element forming the string (joined together with nothing in between)
  // e.g. ['t','a','b'] -> "tab"
  // (We do this all in one line using "chaining" because .split() returns an array for
  // for .reverse() to work on, and .reverse() returns an array for .join() to work on.)
  let backwardsText = text.split('').reverse().join('');
  // Set some random numbers for the voice's pitch and rate parameters for a bit of fun
  let options = {
    pitch: 1,
    rate: 0.75
  };
  // Use ResponsiveVoice to speak the string we generated, with UK English Male voice
  // and the options we just specified.
  responsiveVoice.speak(backwardsText, 'UK English Male', options);
}

// addButton(label)
//
// Creates a button using jQuery UI on a div with the label specified
// and adds it to the page, returning the button as well
function addButton(label) {
  // Create a div with jQuery using HTML
  let $button = $('<div></div>');
  // Give it the guess class
  $button.addClass("guess");
  // Set the text in the div to our label
  $button.text(label);
  // Turn the div into a button using jQuery UI's .button() method
  $button.button();
  // Listen for a click on the button which means the user has guessed
  $button.on('click', clickGuess);
  // Finally, add the button to the page so we can see it
  $('body').append($button);
  // Return the button
  return $button;
}

// handleGuess()
//
// Checks whether this was the correct guess (button) and
// if so starts a new round
// if not indicates it was incorrect
function handleGuess(name) {
  console.log("NAME:: "+name);
  if (name.toLowerCase() == $correctButton.text().toLowerCase()){
    $(this).effect('shake');
    // Remove all the buttons
    $('.guess').remove();
    score = score + 1;
    $("#scoreVal").text(score);
    // Start a new round
    setTimeout(newRound, 1000);


  }
  else {
    // Otherwise shake all the guess buttons
    $('.guess').effect('shake');
    // And say the correct animal again to "help" them
    sayBackwards($correctButton.text());
  }
}
function clickGuess() {
  if ($(this).text().toLowerCase() == $correctButton.text().toLowerCase()){
    $(this).effect('shake');
    // Remove all the buttons
    $('.guess').remove();
    // Set the score
    score = score + 1;
    $("#scoreVal").text(score);
    // Start a new round
    setTimeout(newRound, 1000);
  }
  else {
    // Otherwise shake all the guess buttons
    $('.guess').effect('shake');
    // And say the correct animal again to "help" them
    sayBackwards($correctButton.text());
  }
}

function giveUpGuess(){
  // If they say "I give up", the correct answer should appear.
    $correctButton.effect('shake');
}

// getRandomElement(array)
//
// Returns a random element from the provided array
function getRandomElement(array) {
  let element = array[Math.floor(Math.random() * array.length)];
  return element;
}
function resetRound(){
  $('.guess').remove();
  newRound();
}
