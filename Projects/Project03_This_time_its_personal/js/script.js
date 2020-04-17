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

$('#two').hide();

  $.getJSON('data/data.json')
    .done(gotData)
    .fail(dataError);

// Random Header Image in Javascript
//
let pictures = ['backgroundImage.jpg','backgroundImage2.jpg','backgroundImage3.jpg',
'backgroundImage4.jpg','backgroundImage5.jpg'];
$('#background').css({'background-image': 'url(../assets/images/'+pictures[Math.floor(Math.random()*pictures.length)]+ ')'});
console.log(pictures);


// gotData(data)
//
// Show encouraging words to the user and inspiring Oprah Winfrey quote on
// the main page.
function gotData(data) {

  let encouraging_word = getRandomElement(data.encouraging_words);
  // console.log(encouraging_word);
  let subject = "You are";
  let determinant = "a";
  // Check if the last latter of the condiment is an 's'
  if (encouraging_word.charAt(0) === 'a'|| encouraging_word.charAt(0) ==='e'
  ||encouraging_word.charAt(0) === 'o'||encouraging_word.charAt(0) ==='i'
  ||encouraging_word.charAt(0) ==='u'||encouraging_word.charAt(0) ==='u') {
  // If word starts with vowel, the determinant is "an"
    determinant = 'an';
  }
  let encouraging_words = getRandomElement(data.encouraging_words);
  let oprahQuotes = getRandomElement(data.oprahQuotes);
  let description = `${subject} ${determinant} ${encouraging_word} person! ${oprahQuotes}`;

  $('body').append("<p id ='description'>"+description +"</p>");

}
function dataError(request, text, error) {
  console.error(error);
}
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

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

  // console.log(key);
  // console.log(value);
// Set any username and any password into localStorage.
localStorage.setItem("username", key);
localStorage.setItem("password", value);
// When user click login, it brings it to a second page.
alert('You are loged in.');
pageState = 2;
$('#two').show();
$('#one').hide();
$('#description').hide();
// console.log(localStorage);
};

$(function(){
  var progressbar = $("#progressbar"),
    progressLabel = $(".progress-labl");

  progressbar.progressbar({
    value: false,
    change: function(){
      progressLabel.text(progressbar.progressbar("value")+"%");
    },
    complete: function(){
      progressLabel.text("Complete!");
    }
  });
  function progress(){
    var val = progressbar.progressbar("value")|| 0;
    progressbar.progressbar("value", val +2);
    if (val<99){
      setTimeout(progress,80);
    }
  }
  setTimeout(progress,2000);
});
// One productivity hour countdown
  if (start === false){
    // Get today's date and time
    now = new Date().getTime();
    endTimer = now + 3600000;
    start =true;
    // console.log(now);
    // console.log(endTimer);
    }
    // Update the count down every 1 second
    let interval = setInterval(function() {
    // Get today's date and time
     now = new Date().getTime();
    // Find the distance between now and the count down time
     let distance =  endTimer-now;
     // console.log(distance);
     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
     var seconds = Math.floor((distance % (1000 * 60)) / 1000);
     // console.log(minutes);
    // Display the result in the element with id="timerCountdown"
    document.getElementById("timerCountdown").innerHTML = minutes + "m " + seconds + "s ";
    // If the count down is over, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("timerCountdown").innerHTML = "It's time for a break!";
    }
  });
});
