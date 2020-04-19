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

// Create a Typing Effect
let e = 0,txt;
txt = "Gratitude makes sense of our past, brings peace for today, and creates a vision for tomorrow. ~Melody Beattie";

$(document).ready(function() {

//Add button with the newElement()::
$("#addButton").click(newElement);

// Hide the menu selection, timerCountdown and progress bar on the main page
$('#two').hide();
$('#three').hide();
$('#four').hide();

  $.getJSON('data/data.json')
    .done(gotData)
    .fail(dataError);

// Random Header Image in Javascript
// Everytime user refresh the page, a new landscape image appears
let pictures = ['backgroundImage.jpg','backgroundImage2.jpg','backgroundImage3.jpg',
'backgroundImage4.jpg','backgroundImage5.jpg'];
$('#background').css({'background-image': 'url(assets/images/'+pictures[Math.floor(Math.random()*pictures.length)]+ ')'});
// console.log(pictures);

// Random meme images on page 3, everytime when mouse is over the image
let memes = ['assets/images/memes1.jpg','assets/images/memes2.png','assets/images/memes3.jpg',
'assets/images/memes4.png','assets/images/memes5.jpg','assets/images/memes5.jpg',
'assets/images/memes6.jpg','assets/images/memes7.jpg','assets/images/memes8.jpg','assets/images/memes9.jpg',
'assets/images/memes10.jpg','assets/images/memes11.jpg','assets/images/memes12.png'];
// console.log(memes);

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
$('#three').hide();
$('#four').hide();
$('#description').hide();
$("#entertainment").click(nextPage);
typeWriter();
countdown();
};

// progress bar
//
// "Stress uninstalling..." (a reminder of the whole concept of this "page")
$( function() {
  let progressbar = $( "#progressbar" ),
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
    let val = progressbar.progressbar( "value" ) || 0;
    progressbar.progressbar( "value", val + 1 );
    if ( val < 99 ) {
      setTimeout( progress, 50000);
    }
  }
  setTimeout( progress, 7000);
} );

// One productive hour countdown
// Timer countdown on Top of page 2.
function countdown(){
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
     let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
     let seconds = Math.floor((distance % (1000 * 60)) / 1000);
     // console.log(minutes);
    // Display the result in the element with id="timerCountdown"
    document.getElementById("timerCountdown").innerHTML = minutes + "m " + seconds + "s ";
    // If the count down is over, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("timerCountdown").innerHTML = "It's time for a break!";
    }
  });
}
// Insert a dialog (reminder) button to explain the 2nd page's purpose
  $( function() {
    $( "#dialog" ).dialog({
      autoOpen: false,
      show: {
        effect: "blind",
        duration: 5000
      },
      hide: {
        effect: "explode",
        duration: 5000
      }
    });

  $( "#opener" ).on( "click", function() {
    $( "#dialog" ).dialog( "open" );
  });
} );

// Add new items to the list when user click on "Add" button
// If nothing is in the input, add pop up alert.
function newElement(){
  let inputValue = document.getElementById("todoListInputField").value;

  if (inputValue===''){
    alert("You wrote nothing! :( ");
} else {
  let li = document.createElement("li");
  let t = document.createTextNode(inputValue);
  li.appendChild(t);

// Add the close button
  let span = document.createElement("SPAN");
  span.className = "close";
  span.innerHTML = "x";

// Add the click for close button
  span.onclick = function(){
    let div = this.parentElement;
    div.style.display = "none";
  }
  li.appendChild(span);
  document.getElementById("list").append(li);
  }
}
// Make the quote on page 2 appear with a typeWriter effect
function typeWriter(){
  if(e < txt.length){
    document.getElementById("txt").innerHTML += txt.charAt(e);
    e++;
    setTimeout(typeWriter,100);
  }
}
// Add editable text at bottom of 2nd page.
// If sentence is longer than gray box, return to second line
function editableText(){
  let e = document.getElementById("editable").contentEditable;
  document.getElementById("message").innerHTML = e + " = The text is editable.";
}
// Add jQuery ToolTip widget to tell user that the text is editable
  $(function(){
    $(document).tooltip();
  });
// Add link next page to "next" button
  function nextPage(){
    if(pageState = 2){
      pageState = 3;
      $('#two').hide();
      $('#one').hide();
      $('#three').show();
      $('#four').hide();
      setupList();
      }
  }

  function setupList(){
    // All the elements from my To do List
    let myTodoList = document.getElementsByClassName("todo-li");
    let i;
      for (i=0;i<myTodoList.length; i++){
        let span = document.createElement("SPAN");
        span.className = "close";
        span.innerHTML = "x";
        myTodoList[i].appendChild(span);
      }
    // Click on a close (x) button to delete the current list item.
      let close = document.getElementsByClassName("close");
      for (i = 0; i < close.length; i++){
        close[i].onclick = function(){
          let div = this.parentElement;
          div.style.display = "none";
        }
      }
    // Include a "checked" symbol when user clicks on list item
      let list = document.getElementById("list");
      list.addEventListener('click', function(ev){
        if(ev.target.tagName === "LI"){
          ev.target.classList.toggle('checked');
        }
      }, false);
    }
  // Show random memes when mouse is over image (hover)
  function getRandomMeme(){
  let index = Math.floor(Math.random()*memes.length);
  return memes[index];
  }
  $("#memesAlbum").hover(
    function(){
      let meme = getRandomMeme();
      $("#img").attr("src",meme);
    });
  // Add back button to return from page 3 to page 2
    backButton.onclick = function(){
      if (pageState = 3){
      pageState = 2;
      $('#one').hide();
      $('#two').show();
      $('#three').hide();
      $('#four').hide();
      }
    }
    // Add next button to return from page 4 to page 3
      nextButtonTwo.onclick = function(){
        if (pageState = 3){
        pageState = 4;
        $('#one').hide();
        $('#two').hide();
        $('#three').hide();
        $('#four').show();
        }
      }
      // Add back button to return from page 3 to page 2
        backButtonTwo.onclick = function(){
          if (pageState = 4){
          pageState = 3;
          $('#one').hide();
          $('#two').hide();
          $('#three').show();
          $('#four').hide();
          }
        }
  // Add checkboxradio widget to create a quiz
  $( function() {
  $( "check" ).checkboxradio();
  });
  // Add menu widget to display the 3 different pages
  $( function() {
  $( "#menu" ).menu({
    items: "> :not(.ui-widget-header)"
  });
} );
});
