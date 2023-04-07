import isInViewPort from './util/isInViewPort.js';
import $ from './util/selector-shorthand.js';

// load header include file
const response = await fetch('/include/header.inc.html');
const body = await response.text();

$.one('header').innerHTML = body;

function animateOnScroll() {
  const patterns = $.all('.pattern');
  patterns.forEach((el) => {
    // is this element in the viewport?
    // Has it already been loaded?
    if (isInViewPort(el) && !el.matches('.has-animated')) {
      // add .slide-out to fire animated
      // also lets us ignore this if seen again
      el.classList.add('has-animated');
    }
  });
}

// run animations for items that are already in the viewport
setTimeout(animateOnScroll, 500);

window.addEventListener('resize', animateOnScroll, false);
window.addEventListener('scroll', animateOnScroll, false);