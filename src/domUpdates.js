import User from './user.js';
import Agent from './agent.js';
import Traveler from './traveler.js';
import Trip from './trip.js';

const travelerContainer = document.querySelector('#traveler-container');
const agentContainer = document.querySelector('#agent-container');

let currentUser, destinationsData, tripsData, travelersData;

let domUpdates = {

  transferData(destinations, trips, travelers) {
    destinationsData = destinations;
    tripsData = trips;
    travelersData = travelers;
    console.log(travelersData)
  },

  loadTravelerPage(travelerId) {
    let thisUser = travelersData.travelers.find(user => user.id == travelerId);
    currentUser = new Traveler(thisUser, tripsData, destinationsData);
    this.loadTravelerMenu()
    this.loadDestinationMenu();
  },

  loadAgentPage() {
    currentUser = new Agent({
      "id": 0,
      "name": 'Alex Eickelman',
      "travelerType": 'Agent'
    }, tripsData, destinationsData)
    this.createAgentNavBar()
    this.createAgentRequestsPage()
  },

  loadTravelerMenu() {
    travelerContainer.insertAdjacentHTML('beforeend', `
      <nav class='traveler-nav'>Welcome ${currentUser.name}!
      <div class='traveler-button-container'>
      <button class='traveler-button traveler-button1'>All Destinations</button>
      <button class='traveler-button traveler-button2'>My Trips Information</button>
      </div></nav>
    `)
    // $('.traveler-button1').click(() => this.loadDestinationMenu())
    // $('.traveler-button2').click(() => this.createTravelerTrips(currentUser.usersTrips))
  },

//   loadDestinationMenu() {
//     $('main').html('').append(`<div class="description-background-flex"><div class='card destination-description'><h1 align="center">The following locations are all available vacation destinations!</h1><p align="center">(To book a trip, click the image of the destination and fill out all the input fields)</p></div></div>`)
//     destinationsData.forEach(destination => {
//       $('main').append(
//         `<div id='${destination.id}' class='card'>
//           <header data-id='${destination.id}'>
//           </header>
//           <span data-id='${destination.id}' class='destination-name'>${destination.destination}</span>
//           <img data-id='${destination.id}' tabindex='0' class='card-picture book-destination' src='${destination.image}' alt='${destination.alt}'>
//           <p class="card-cost-info flight-cost">Flight Cost per Person: $${destination.estimatedFlightCostPerPerson}</p>
//           <p class="card-cost-info lodging-cost">Lodging Cost per Day: $${destination.estimatedLodgingCostPerDay}</p>
//           <div class='request-form'></div>
//         </div>`)
//       $('.book-destination').click(() => this.openTripRequestForm(event.target.dataset.id))
//     })
//   }


}

export default domUpdates;