import './css/base.scss';
import domUpdates from './domUpdates.js';
import Agent from './agent.js'
import Traveler from './traveler.js'

const loginContainer = document.querySelector('#login-container');
const travelerContainer = document.querySelector('#traveler-container');
const agentContainer = document.querySelector('#agent-container');
const usernameInput = document.querySelector('#username-input');
const passwordInput = document.querySelector('#password-input');
const loginButton = document.querySelector('#login-button');
const loginError = document.querySelector('#login-error');
const pendingRequestsButton = document.querySelector('.pending-requests-button');
const searchUsersButton = document.querySelector('.search-users-button');
const destinationsCard = document.querySelector('.destinations-card');
const submitRequestButton = document.querySelector('.submit-request-button');

let currentUser, travelersData, tripsData, destinationsData;

loginButton.addEventListener('click', loginHelper);

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('submit-request-button')) {
    domUpdates.getRequestData(event.target.id, currentUser);
  } 
  if (event.target.classList.contains('card-picture')) {
    domUpdates.openTripRequestForm(event.target.parentNode.id)
  }
  if (event.target.classList.contains('approve-button')) {
    currentUser.approveTripRequest(event.target.id)
    window.alert('Request successfully approved!')
  }
  if (event.target.classList.contains('deny-button')) {
    currentUser.deleteUpcomingTrip(event.target.id)
    window.alert('Request successfully deleted!')
  }
})

pendingRequestsButton.addEventListener('click', () => domUpdates.updateTripsData());
searchUsersButton.addEventListener('click', () => domUpdates.loadAgentSearchPage())
usernameInput.addEventListener('keyup', removeErrorMessage);
passwordInput.addEventListener('keyup', removeErrorMessage);

let allTravelersData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers')
  .then(response => response.json());

let allTripsData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips')
  .then(response => response.json());

let allDestinationsData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/destinations/destinations')
  .then(response => response.json());

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

function loginHelper() {
  let usernameInfo = usernameInput.value
  let passwordInfo = passwordInput.value
  logIn(usernameInfo, passwordInfo)
}

function logIn(username, password) {
  if (username.includes('traveler') && password === 'travel2020') {
    let travelerId = Number(username.slice(8));
    let thisUser = travelersData.travelers.find(user => user.id == travelerId);
    currentUser = new Traveler(thisUser, tripsData, destinationsData);
    loginContainer.classList.add('hide');
    travelerContainer.classList.remove('hide');
    domUpdates.transferData(destinationsData, tripsData, travelersData)
    domUpdates.loadTravelerPage(travelerId, currentUser);
  } else if (username === 'agent' && password === 'travel2020') {
    currentUser = new Agent({
      "id": 0,
      "name": 'Alex Eickelman',
      "travelerType": 'Agent'
    }, tripsData, destinationsData)
    loginContainer.classList.add('hide');
    agentContainer.classList.remove('hide');
    domUpdates.transferData(destinationsData, tripsData, travelersData)
    domUpdates.loadAgentPage(currentUser);
  } else {
    loginError.classList.remove('hide');
  }
}

function removeErrorMessage() {
  loginError.classList.add('hide');
}

