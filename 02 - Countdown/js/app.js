const items = document.querySelectorAll('.countdown-item > h4');
const countdownElem = document.querySelector('.countdown');

// set the countdown date
let countdownDate = new Date(2023, 2, 6, 9, 0, 0).getTime();

function getCountTime() {
  // get the current time
  const now = new Date().getTime();
  // find the time difference
  const distance = countdownDate - now;
  // 1 sec  = 1000 Millisecond; 1 min = 60 sec; 1 hour = 60 min; 1 day = 24 hours;
  // creating variable in milliseconds
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;
  // counting for days, hours, minutes, seconds
  let days = Math.floor(distance / oneDay);
  let hours = Math.floor((distance % oneDay) / oneHour);
  let minutes = Math.floor((distance % oneHour) / oneMinute);
  let seconds = Math.floor((distance % oneMinute) / 1000);
  //creating array with variables
  const values = [days, hours, minutes, seconds];
  //add variable values to the page
  items.forEach(function (item, index) {
    item.textContent = values[index];
  });

  if (distance < 0) {
    clearInterval(countdown)
    countdownElem.innerHTML = "<h4 class='expired'>Times is up!</h4>"
  }
  console.log(values);
}
//counter update every second
let countdown = setInterval(getCountTime, 1000);
getCountTime();
