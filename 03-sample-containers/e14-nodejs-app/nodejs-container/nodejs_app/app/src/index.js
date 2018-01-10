"use strict";

let num = 0;
const handler = setInterval(() =>  {
  console.log(`Executed ${num++} time(s)`);
  if (num >= 10) {
    clearInterval(handler);
  }
}, 1000);
