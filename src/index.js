import './css/base.scss';
import domUpdates from './domUpdates.js';

const loginContainer = document.querySelector('#login-container');
const travelerContainer = document.querySelector('#traveler-container');
const agentContainer = document.querySelector('#agent-container');
const usernameInput = document.querySelector('#username-input');
const passwordInput = document.querySelector('#password-input');
const loginButton = document.querySelector('#login-button');
const loginError = document.querySelector('#login-error');
// const allDestinationsButton = document.querySelector('.all-destinations-button');
// const myTripsButton = document.querySelector('.my-trips-button');
const pendingRequestsButton = document.querySelector('.pending-requests-button');
const searchUsersButton = document.querySelector('.search-users-button');
// const requestTable = document.querySelector('.request-table')
// const approveButton = document.querySelector('.approve-button');
// const denyButton = document.querySelector('.deny-button')
const destinationsCard = document.querySelector('.destinations-card');
// const submitRequestButton = document.querySelector('.submit-request-button');

loginButton.addEventListener('click', loginHelper);

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

let travelersData, tripsData, destinationsData, travelerId;

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
  // be sure to change pw back to travel 2020!!!!
  if (username.includes('traveler') && password === 'travel2020') {
    loginContainer.classList.add('hide');
    travelerContainer.classList.remove('hide');
    domUpdates.transferData(destinationsData, tripsData, travelersData)
    travelerId = Number(username.slice(8));
    domUpdates.loadTravelerPage(travelerId);
  } else if (username === 'agent' && password === 'travel2020') {
    loginContainer.classList.add('hide');
    agentContainer.classList.remove('hide');
    domUpdates.transferData(destinationsData, tripsData, travelersData)
    domUpdates.loadAgentPage();
  } else {
    loginError.classList.remove('hide');
  }
}

function removeErrorMessage() {
  loginError.classList.add('hide');
}

function loadDestinationMenu() {
  const cardPhoto = document.querySelector('.card-picture');
  cardPhoto.addEventListener('click', this.openTripRequestForm)
  destinationsData.destinations.forEach(destination => {
    destinationsCard.insertAdjacentHTML('beforeend',
      `<section id='${destination.id}' 'destinations-card'>
          <header data-id='${destination.id}'>
          </header>
          <span data-id='${destination.id}' class='destination-name'>${destination.destination}</span>
          <img data-id='${destination.id}' tabindex='0' class='card-picture book-destination' src='${destination.image}' alt='${destination.alt}'>
          <p class="card-cost-info flight-cost">Flight Cost per Person: $${destination.estimatedFlightCostPerPerson}</p>
          <p class="card-cost-info lodging-cost">Lodging Cost per Day: $${destination.estimatedLodgingCostPerDay}</p>
          <section class='request-form'></section>
        </section>`
    )
  })
  travelerContainer.insertAdjacentHTML('beforebegin', `<section class="description-background-flex">
    <section class='card destination-description'>
    <h1 align="center">Book your flight to the following destinations!</h1>
    <p align="center">(Where would you like to go today? Click on an image to get there!)</p>
    </section>
    </section>`)
  domUpdates.openTripRequestForm(event.target.dataset.id)
}
