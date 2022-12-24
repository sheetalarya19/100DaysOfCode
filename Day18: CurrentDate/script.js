const lang = navigator.language;
let date = new Date()
let dayNumber = date.getDate();
let month = date.getMonth();
let dayName = date.toLocaleString(lang, {weekday:'long'});
let monthName = date.toLocaleString(lang, {month:'long'});
let year = date.getFullYear()


const monthNameText = document.querySelector('#monthName');
const dayNameText = document.querySelector('#dayName');
const dayNumberText = document.querySelector('#dayNumber');
const yearText = document.querySelector('#year');

monthNameText.textContent = monthName;
dayNameText.textContent = dayName;
dayNumberText.textContent = dayNumber;
yearText.textContent = year;