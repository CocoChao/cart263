"use strict";

/********************************************************************

Pixel painter
Pippin Barr
Modified by : Carole Chao

A small DOM-based program for "painting" on div-based pixels.

*********************************************************************/

// // Constants
// const NUM_PIXELS = 1000;
// const PIXEL_REVERT_DELAY = 1000;
// const DEFAULT_COLOR = 'black';
// const PAINT_COLOR = 'white';

// Set up our starting function for when the page loads
window.onload = setup;

// setup
//
// Adds DIVs to the page along with event listeners that will allow
// then to change color on mouseover.
function setup() {
  // A loop that runs once per pixel we need
  for (let i = 0; i < 2000; i++) {
    let pixel = document.createElement('div');
    pixel.setAttribute('class', 'pixel');
    pixel.addEventListener('mouseover', paint);
    document.body.appendChild(pixel);
  }
}

// paint
//
// Called by the mouseover event handler on each pixel. Changes
// the pixel's color and sets a timer for it to revert
function paint(e) {
  let pixel = e.target;
  pixel.style.backgroundColor = 'white';
  // The colored pixel will turn to black after 2000 milliseconds
  setTimeout(resetPixel, 2000, pixel);
}

// resetPixel
//
// Takes the provided pixel element and sets its color back to default
function resetPixel(pixel) {
  pixel.style.backgroundColor = 'black';
}

function randomColor(){
  let r = Math.random();
  if (r < 0.4){
    // pixel.style.backgroundColor = RGB(235, 52, 122);
    console.log("I'm happy!");
  }
  else if (r < 0.7){
    // pixel.style.backgroundColor = RGB(84, 165, 222);
    console.log("I'm sad!");
  }
  else {
    // pixel.style.backgroundColor = RGB(97, 247, 89);
    console.log("I'm mad!");
  }
}
