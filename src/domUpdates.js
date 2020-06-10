import Agent from './agent.js';
import Traveler from './traveler.js';
import Trip from './trip.js';

let currentUser, destinationsData, tripsData, travelersData, dateInput, durationInput, travelersAmountInput;

const travelerContainer = document.querySelector('#traveler-container');
const agentContainer = document.querySelector('#agent-container');
const agentSearchContainer = document.querySelector('.agent-search-page');
const searchResultsContainer = document.querySelector('.search-results-table')
const requestTable = document.querySelector('.request-table');
const destinationsCard = document.querySelector('.destinations-card');

let domUpdates = {
  
  transferData(destinations, trips, travelers) {
    destinationsData = destinations;
    tripsData = trips;
    travelersData = travelers;
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
    this.loadAgentNavBar()
    this.loadAgentRequestsPage()
  },

  loadTravelerMenu() {
    travelerContainer.insertAdjacentHTML('beforeend', `
      <section class='traveler-section'>Welcome ${currentUser.name}!</section>
    `)
  },

  loadDestinationMenu() {
    destinationsData.destinations.forEach(destination => {
      destinationsCard.insertAdjacentHTML('beforeend', 
        `<sectionid='${destination.id}' 'destinations-card'>
          <header data-id='${destination.id}'>
          </header>
          <span data-id='${destination.id}' class='destination-name'>${destination.destination}</span>
          <img data-id='${destination.id}' tabindex='0' class='card-picture book-destination' src='${destination.image}' alt='${destination.alt}'>
          <p class="card-cost-info flight-cost">Flight Cost per Person: $${destination.estimatedFlightCostPerPerson}</p>
          <p class="card-cost-info lodging-cost">Lodging Cost per Day: $${destination.estimatedLodgingCostPerDay}</p>
          <sectionclass='request-form'></div>
        </div>`
      )
      const cardPhoto = document.querySelector('.card-picture');
      cardPhoto.addEventListener('click', this.openTripRequestForm)
    })
    travelerContainer.insertAdjacentHTML('beforebegin', `<section class="description-background-flex">
    <section class='card destination-description'>
    <h1 align="center">Book your flight to the following destinations!</h1>
    <p align="center">(Where would you like to go today? Click on an image to get there!)</p>
    </div>
    </div>`)
  },

  openTripRequestForm(dataId, flightCost, lodgingCost) {
    travelerContainer.insertAdjacentHTML('beforebegin',
      `<label class='form-label'>Date(YYYY/MM/DD):</label>
      <input id='date' type='text' class='request-inputs' size='30'>
      <label for='duration' class='form-label'>Duration(days):</label>
      <input id='duration' type='text' class='request-inputs req-estimate-inputs' size='30'>
      <label for='travelersNum' class='form-label'>Number of Travelers:</label>
      <input id='travelersNum' type='text' class='request-inputs req-estimate-inputs' size='30'>
      <button data-id='${dataId}' class='traveler-button submit-request-button'>Submit Trip Request</button>
      <p class='input-missing-warning denied-message'></p>
      `)
    const submitRequestButton = document.querySelector('.submit-request-button');
    submitRequestButton.addEventListener('click', this.getRequestData);
  },

  getRequestData() {
    debugger
    dateInput = document.querySelector('#date');
    durationInput = document.querySelector('#duration');
    travelersAmountInput = document.querySelector('#travelersNum');
    let date = dateInput.value
    console.log(date)
    let duration = durationInput.value
    console.log(duration)
    let travelers = travelersAmountInput.value
    console.log(travelers)
    if (date.length && duration.length && travelers.length) {
      this.createRequestFormat(date, duration, travelers, event.target.dataset.id)
    } else {
      window.alert('Please Enter All Request Criteria!')
    }
  },

  createRequestFormat(date, duration, travelers, id) {
    let completedRequest = {
      "id": Date.now(),
      "userID": currentUser.id,
      "destinationID": Number(id),
      "travelers": Number(travelers),
      date,
      "duration": Number(duration),
      "status": "pending",
      "suggestedActivities": []
    }
    currentUser.makeTripRequest(completedRequest)
    let thisTrip = new Trip(completedRequest, destinationsData)
    window.alert(`Request Successfully Sent! Your Estimated Trip Cost is $${thisTrip.calculateEstimatedCost()}!`)
  },


  loadAgentNavBar() {
    agentContainer.insertAdjacentHTML('beforebegin',  `
      <section class='traveler-section'>Welcome ${currentUser.name}!
        <section class='years-income'>You've earned $${currentUser.calculateYearsIncome()} so far this year! Includes 10% commision fee. </section>
      </section> 
    `)
  },
  
  loadAgentRequestsPage() {
    let allRequests = currentUser.displayRequests()
    agentSearchContainer.classList.remove('hide')
    allRequests.forEach(request => {
      let thisTrip = new Trip(request, destinationsData)
      let thisUser = travelersData.travelers.find(user => user.id === request.userID)
      agentSearchContainer.insertAdjacentHTML('beforeend',
        `<tr class='request-row request${request.id}'>
          <td>${thisUser.name}</td>
          <td>${request.date}</td>
          <td>${request.duration}</td>
          <td>$${thisTrip.calculateEstimatedCost()}</td>
          <td><button data-id='${request.id}' class='approve-button'>Approve Request</button></td>
          <td><button data-id='${request.id}' class='deny-button'>Deny Request</button></td>
        `)
    })
    agentSearchContainer.insertAdjacentHTML('beforebegin',
      `<section class='pending-trips-container'>
      <h1 class='request-heading' align='center'>Current Outstanding Trip Requests:</h1>
    </section>`)
    const approveButton = document.querySelector('.approve-button');
    const denyButton = document.querySelector('.deny-button');
    approveButton.addEventListener('click', currentUser.approveTripRequest(Number(event.target.dataset.id)));
    denyButton.addEventListener('click', currentUser.deleteUpcomingTrip(Number(event.target.dataset.id))); 
    this.createAgentTodaysTripsTable()    
  },

  loadAgentSearchPage() {
    agentSearchContainer.classList.remove('hide')
    agentSearchContainer.insertAdjacentHTML('beforebegin', 
      `
      <section class="search-container">
       <section class="search-input-container">
         <input type="text" class="search-input" placeholder="Search Users By Name Here" size="80">
         <input type="image" class="search-image" src="https://image.flaticon.com/icons/svg/762/762652.svg" width="70px" height="70px">
        </section>
        <section class="search-results-container">
          <p class="search-results-message"><i>Click the search icon after entering a name and results will appear here</i></p>
        </section>
      </section>`)
    const searchInput = document.querySelector('.search-input')
    const searchImage = document.querySelector('.search-image')
    searchImage.addEventListener('click', this.populateSearchResults)
    let userSearch = searchInput.value
    this.populateSearchResults(userSearch)
  },

  populateSearchResults(userSearch) {
    let foundUsers = currentUser.searchUserDetails(userSearch, travelersData);
    agentSearchContainer.insertAdjacentHTML('beforebegin', `
        <table class="search-results-table">
          <th class="results-row-heading">Name</th>
          <th class="results-row-heading">Trip</th>
          <th class="results-row-heading">Status</th>
          <th class="results-row-heading">Trip Cost</th>
          <th class="results-row-heading">Approve(if available)</th>
          <th class="results-row-heading">Deny(if available)</th>
        </table>
        `)
    foundUsers.forEach(foundUser => {
      let thisUser = new Traveler(foundUser, tripsData, destinationsData)
      let pastTrips = thisUser.displayPreviousTrips()
      let presentTrips = thisUser.displayPresentTrips()
      let futureTrips = thisUser.displayUpcomingTrips()
      pastTrips.forEach(pastTrip => {
        let thisTrip = new Trip(pastTrip, destinationsData)
        let thisDestination = thisTrip.returnDestinationDetails()
        searchResultsContainer.insertAdjacentHTML('beforebegin',
          `<tr class='search-row'>
              <td>${thisUser.name}</td>
              <td>${thisDestination.destination}, Id#${thisTrip.id}</td>
              <td>Past</td>
              <td>$${thisTrip.calculateEstimatedCost()}</td>
              <td>N/A</td>
              <td>N/A</td>
            `
        )
      })
      presentTrips.forEach(presentTrip => {
        let thisTrip = new Trip(presentTrip, destinationsData)
        let thisDestination = thisTrip.returnDestinationDetails()
        searchResultsContainer.insertAdjacentHTML('beforebegin',
          `<tr class='search-row'>
              <td>${thisUser.name}</td>
              <td>${thisDestination.destination}, Id#${thisTrip.id}</td>
              <td>Present</td>
              <td>$${thisTrip.calculateEstimatedCost()}</td>
              <td>N/A</td>
              <td>N/A</td>
            `
        )
      })
      futureTrips.forEach(futureTrip => {
        let thisTrip = new Trip(futureTrip, destinationsData)
        let thisDestination = thisTrip.returnDestinationDetails()
        searchResultsContainer.insertAdjacentHTML('beforebegin',
          `<tr class='search-row'>
              <td>${thisUser.name}</td>
              <td>${thisDestination.destination}, Id#${thisTrip.id}</td>
              <td>Future</td>
              <td>$${thisTrip.calculateEstimatedCost()}</td>
              <td><button data-id='${thisTrip.id}' class='approve-button approve-button2'>Approve Trip</td>
              <td><button data-id='${thisTrip.id}' class='deny-button deny-button2'>Delete Trip</td>
            `
        )
      })
    })
  },

  createAgentTodaysTripsTable() {
    let todaysTrips = currentUser.displayTodaysTrips()
    agentContainer.insertAdjacentHTML('beforebegin', `<section class='row-two-clear'>
      <section class="todays-trips-container">
      </section>
      </section>
      `)
    const todaysTripsContainer = document.querySelector('.todays-trips-container')
    todaysTripsContainer.insertAdjacentHTML('beforebegin',
      `<h1 class="todays-trips-heading">There Are ${todaysTrips.length} Trips Currently in Progress:</h1>`)
  }
}

export default domUpdates;