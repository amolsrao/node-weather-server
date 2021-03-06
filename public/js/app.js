console.log('Client side JavaScript file is loaded!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = '';

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = 'loading...';
  messageTwo.textContent = '';

  fetch(`/weather?address=${location}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) messageOne.textContent = data.error;
      else {
        const { forecast, location } = data;
        messageOne.textContent = location;
        messageTwo.textContent = forecast;
      }
    });
});
