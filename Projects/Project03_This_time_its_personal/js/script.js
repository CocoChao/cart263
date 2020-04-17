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

// Declare viariables for the timerCountdown
let start = false;
let now;
let endTimer;
let distance;


$(document).ready(function() {

// Hide the menu selection, timerCountdown and progress bar on the main page
$('#two').hide();

  $.getJSON('data/data.json')
    .done(gotData)
    .fail(dataError);

// Random Header Image in Javascript
// Everytime user refresh the page, a new landscape image appears
let pictures = ['backgroundImage.jpg','backgroundImage2.jpg','backgroundImage3.jpg',
'backgroundImage4.jpg','backgroundImage5.jpg'];
$('#background').css({'background-image': 'url(../assets/images/'+pictures[Math.floor(Math.random()*pictures.length)]+ ')'});
// console.log(pictures);

// gotData(data)
//
// Show random encouraging words and a random inspiring Oprah Winfrey quote on
// the main page.
function gotData(data) {

  let encouraging_word = getRandomElement(data.encouraging_words);
  // console.log(encouraging_word);
  let subject = "You are";
  let determinant = "a";
  // Check if the first letter of the encouraging word is an vowel
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

// Login Form
//
// Elements in the login form using Local localStorage
// Username and password unique to every user. Username and password is set and stored
// in local storage at the same time.
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
// When user click login, there is a pop up.
// User clicks "okay" and the second page appears.
alert('You are loged in.');
pageState = 2;
$('#two').show();
$('#one').hide();
$('#description').hide();
// console.log(localStorage);
};

// progress bar
//
// "Stress uninstalling..." (a reminder of the whole concept of this "page")
$( function() {
  var progressbar = $( "#progressbar" ),
    progressLabel = $( ".progress-label" );

  progressbar.progressbar({
    value: false,
    change: function() {
      progressLabel.text( progressbar.progressbar( "value" ) + "% " + "Stress uninstalling" );
    },
    complete: function() {
      progressLabel.text( "Completed!" );
    }
  });

  function progress() {
    var val = progressbar.progressbar( "value" ) || 0;
    progressbar.progressbar( "value", val + 1 );
    if ( val < 99 ) {
      setTimeout( progress, 80);
    }
  }
  setTimeout( progress, 5000);
} );

// One productivity hour countdown
// Timer countdown on Top of page 2.
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

//
// All the elements from my To do List
// Original code from: https://www.w3schools.com/howto/howto_js_todolist.asp
// Create a "close" (x) button and append it to each To Do List item.
var myTodoList = document.getElementsByTagName("LI");
var i;
  for (i=0;i<myTodoList.length; i++){
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
      span.className = "close";
      span.appendChild(txt);
      myTodoList[i].appendChild(span);
    }
// Click on a close (x) button to delete the current list item.
var close = document.getElementsByClassName("close");
var i;
  for (i = 0; i < close.length; i++){
    close[i].onclick = function(){
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
// Include a "checked" symbol when user clicks on list item
var list = document.querySelector('ul');
  list.addEventListener('click', function(ev){
    if(ev.target.tagName === "LI"){
      ev.target.classList.toggle('checked');
    }
  }, false);
// Add new items to the list when user click on "Add" button
// If nothing is in the input, add pop up alert.
function newElement(){
  var li = document.createElement("li");
  var inputValue = document.getElementById("todoListHeader").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue===''){
    alert("You wrote nothing! :( ");
} else {
  document.getElementById("list").value="";
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
      }
    }
  }
}
});
