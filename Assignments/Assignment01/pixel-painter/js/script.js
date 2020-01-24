"use strict";

/********************************************************************

Pixel painter
Pippin Barr
Modified by : Carole Chao

A small DOM-based program for "painting" on div-based pixels.

*********************************************************************/

// Constants
const NUM_PIXELS = 1000;
const PIXEL_REVERT_DELAY = 1000;
const DEFAULT_COLOR = 'black';
const PAINT_COLOR = 'white';
let rotation = 0;
let currentKey = ;

// Set up our starting function for when the page loads
window.onload = setup;

// setup
//
// Adds DIVs to the page along with event listeners that will allow
// then to change color on mouseover.
function setup() {
  // A loop that runs once per pixel we need
  for (let i = 0; i < 2000; i++) {
    // Create a DIV and store it in a variable
    let pixel = document.createElement('div');
    // Add the 'pixel' class to the new element
    pixel.setAttribute('class', 'pixel');
    // Add a mouseover handler to the new element
    pixel.addEventListener('mouseover', paint);
    // Add the element to the body of the page
    document.body.appendChild(pixel);
  }
  // Add a keydown handler to the document
  document.addEventListener('keydown', rotatePixels);
  // Add a click handler to the document
  document.addEventListener('click', remove);
  // Add another keydown handler to the document
  document.addEventListener('keydown', typed);
}


// paint
//
// Called by the mouseover event handler on each pixel. Changes
// the pixel's color and sets a timer for it to revert
function paint(e) {
  // e.target links variable pixel to addEventListener
  let pixel = e.target;
  // Get a number between 0 and 1 to paint a pixel in a random RGB color
//Code source: https://stackoverflow.com/questions/1484506/random-color-generator
  let r = Math.random() * 255;
  let g = Math.random() * 255;
  let b = Math.random() * 255;
  pixel.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
// That site made me understand better the use of Math.random() and how to
// make random colored pixels
  // The colored pixel will turn to black after 3000 milliseconds
  setTimeout(resetPixel, 3000, pixel);
}


// resetPixel
//
// Takes the provided pixel element and sets its color back to default
function resetPixel(pixel) {
  pixel.style.backgroundColor = 'black';
}

// rotatePixels
//
// Make all the pixels rotate by 1 degree clockwise when right arrow key is pressed
// Make all the pixels rotate by 1 degree counter-clockwise when the left arrow key is pressed
function rotatePixels(e){
  let pixels = document.getElementsByClassName("pixel");
  if (e.keyCode === 39) { // Right arrow key is pressed
    for (let i = 0; i < pixels.length; i++) {
    rotation += 1; // rotate 1 degree clockwise
    pixels[i].style.transform = `rotate(${rotation}deg)`;
  }
}
  else if (e.keyCode === 37) { //Left arrow key is pressed
    for (let i = 0; i < pixels.length; i++) {
    rotation -= 1; // rotate 1 degree counter-clockwise
    pixels[i].style.transform = `rotate(${rotation}deg)`;
  }
}
}

// Remove
//
// Called by the click event handler on each pixel. Removes the target pixel
// from the screen and turns black after 2000 milliseconds.
function remove(e){
  // e.target links variable pixel to addEventListener
  let pixel = e.target;
  pixel.style.backgroundColor = 'white';
}
