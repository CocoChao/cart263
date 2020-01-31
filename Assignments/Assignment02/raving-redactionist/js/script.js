"use strict";

/*****************

Raving Redactionist
Pippin Barr
Modified by : Carole Chao

You are redacting a document, but it keeps becoming unredacted!
Click the secret information to hide it, don't let all the
secrets become revealed!

******************/

// The chance a span will be revealed per update
const REVEAL_POSSIBILITY = 0.1;
// How often to update the spans (potentially revealing them)
const UPDATE_FREQUENCY = 500;

// A variable to store redacted span
let $redacted;
// A variable to track the number of secret found
let $secretsFound;
let $found = 0;
// A variable to track the number of total secrets
let $secretsTotatl;
// A variable to track all the secrets
let $secrets = 0;

// When the document is loaded we call the setup function
$(document).ready(setup);

// setup()
//
// Sets the click handler and starts the time loop
function setup() {
  // Save the selection of all spans (since we do stuff to them multiple times)
  $redacted = $('.redacted');
  // Set a click handler on the spans (so we know when they're clicked)
  $redacted.on('click', redactedClicked);
  // Set an interval of 500 milliseconds to update the state of the page
  setInterval(update, UPDATE_FREQUENCY);
  // Track the number of total secrets
  $secretsTotal = $("secret").length;
  // Add an event for "mouseover" to highlight all the secrets
  $('secrets').on('mouseover', highlight);
};

// disappear
//
// Called by the mouseover event handler to all the secrets.
// Highlights the secret text once mouse is over.
function highlight(e){
  // Change the text's style and highlight the secret.
  $(this).addClass("found");
  // Removes the mouseover event from the found element.
  $(this).off("mouseover", highlight);
  //Increase the counter variable by one.
  $found += 1;
}



// spanClicked()
//
// When a span is clicked we remove its revealed class and add the redacted class
// thus blacking it out
function redactedClicked() {
  $(this).removeClass('revealed');
  $(this).addClass('redacted');
}

// update()
//
// Update is called every 500 milliseconds and it updates all the spans on the page
// using jQuery's each() function which calls the specified function on _each_ of the
// elements in the selection
function update() {
  $redacted.each(updateSpan);
  // Show the total number of secrets on the last line of the text
  $(this).text($found);
}

// updateSpan()
//
// With random chance it unblanks the current span by removing the
// redacted class and adding the revealed class. Because this function is called
// by each(), "this" refers to the current element that each has selected.
function updateSpan() {
  let r = Math.random();
  if (r < REVEAL_POSSIBILITY) {
    $(this).removeClass('redacted');
    $(this).addClass('revealed');
  }
}
