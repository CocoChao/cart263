/*

This time it's personal
Carole Chao

Chooses random words from local JSON data to fill out a sentence
describing a condiment based on cats and rooms... weird.

Uses:

Corpora
https://github.com/dariusk/corpora

*/

// Elements in the login form using Local localStorage
const inputKey = document.getElementById("inputKey");
const inputValue = document.getElementById("inputValue");
const insertButton = document.getElementById("insertButton");

$(document).ready(function() {

  $.getJSON('data/data.json')
    .done(gotData)
    .fail(dataError);

});

//
//
$("insertButton").onclick = function (){
  const key= inputKey.value;
  const value = inputValue.value;

  console.log(key);
  console.log(value);
}


console.log(localStorage);

function gotData(data) {

  let condiment = getRandomElement(data.condiments);
  let verb = 'is';
  if (condiment.charAt(condiment.length - 1) === 's') {
    verb = 'are';
  }

  let cat = getRandomElement(data.cats);

  let room = getRandomElement(data.rooms);

  let description = `${condiment} ${verb} like a ${cat} in a ${room}.`;

  $('body').append(description)
}

function dataError(request, text, error) {
  console.error(error);
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}
