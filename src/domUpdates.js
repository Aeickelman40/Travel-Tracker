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
  },

  createAgentNavBar() {

  },

  createAgentRequestsPage() {

  }
}

export default domUpdates;