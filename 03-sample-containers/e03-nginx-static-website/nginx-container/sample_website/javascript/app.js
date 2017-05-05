"use strict";

/* globals InfoboxLogger */

const logger = new InfoboxLogger("infobox");


const btn = document.querySelector("button");
btn.addEventListener("click", () => {
  logger.insertln("The form submission has been disabled for 5 seconds");
  btn.disabled = true;
  setTimeout(() => {
    btn.disabled = false;
    logger.insertln("Form submission has been enabled again");
  }, 5000);
});