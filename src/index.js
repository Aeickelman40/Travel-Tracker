import './css/base.scss';

const loginContainer = document.querySelector('#login-container');
const travelerContainer = document.querySelector('#traveler-container');
const agentContainer = document.querySelector('#agent-container');
const usernameInput = document.querySelector('#username-input');
const passwordInput = document.querySelector('#password-input');
const loginButton = document.querySelector('#login-button');
const loginError = document.querySelector('#login-error')


loginButton.addEventListener('click', logIn);
usernameInput.addEventListener('keyup', removeErrorMessage);
passwordInput.addEventListener('keyup', removeErrorMessage);

let allTravelersData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers')
  .then(response => response.json());

let allTripsData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips')
  .then(response => response.json());

let allDestinationsData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/destinations/destinations')
  .then(response => response.json());

let travelersData, tripsData, destinationsData;

Promise.all([allTravelersData, allTripsData, allDestinationsData])
  .then(data => {
    travelersData = data[0];
    console.log('travelersData', travelersData)
    tripsData = data[1]; 
    console.log('tripsData', tripsData)
    destinationsData = data[2];
    console.log('destinationsData', destinationsData)
  })
  .catch(err => {
    console.error(err.message)
  });

function logIn() {
  if (usernameInput.value.includes('traveler') && passwordInput.value === 'travel2020') {
    loginContainer.classList.add('hide');
    travelerContainer.classList.remove('hide');
  } else if (usernameInput.value === 'agent' && passwordInput.value === 'travel2020') {
    loginContainer.classList.add('hide');
    agentContainer.classList.remove('hide');
  } else {
    loginError.classList.remove('hide');
  }
}

function removeErrorMessage() {
  loginError.classList.add('hide');
}
