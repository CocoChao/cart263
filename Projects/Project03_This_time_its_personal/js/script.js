"use strict"
/*

This time it's personal
Carole Chao

Chooses random words from local JSON data to fill out a sentence
describing a condiment based on cats and rooms... weird.

Uses:

Corpora
https://github.com/dariusk/corpora

*/

let pageState = 1; //main page is active

$(document).ready(function() {

  $.getJSON('data/data.json')
    .done(gotData)
    .fail(dataError);

//
//
// Elements in the login form using Local localStorage
const inputKey = document.getElementById("inputKey");
const inputValue = document.getElementById("inputValue");
const insertButton = document.getElementById("insertButton");
// When user clicks Login button, username and password is saved into localStorage
insertButton.onclick = function(){
  const key = inputKey.value;
  const value = inputValue.value;

  console.log(key);
  console.log(value);
// Set any username and any password into localStorage
localStorage.setItem("username", key);
localStorage.setItem("password", value);
console.log(localStorage);

};

// gotData(data)
//
// Show encouraging words to the user and inspiring Oprah Winfrey quote on
// the main page.
function gotData(data) {

  let subject = "You are a"
  let encouraging_words = getRandomElement(data.encouraging_words);
  let oprahQuotes = getRandomElement(data.oprahQuotes);
  let description = `${subject} ${encouraging_words} person! ${oprahQuotes}`;

  $('body').append(description)
}
function dataError(request, text, error) {
  console.error(error);
}
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}
});
