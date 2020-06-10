import User from './user';
import Trip from './trip';
var moment = require('moment');

class Agent extends User {
  constructor(user, tripsData, destinationsData) {
    super(user, tripsData, destinationsData)
  }

  approveTripRequest(tripID) {
    let thisTrip = {
      "id": +tripID,
      "status": "approved"
    }
    fetch("https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/updateTrip", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        thisTrip
      ),
    })
      .then(response => response.json())
      .then(json => {
        console.log('Request success: ', json)
      })
      .catch(err => console.log('Request failure: ', err));
  }

  deleteUpcomingTrip(tripID) {
    let thisTrip = {
      "id": +tripID
    }
    fetch("https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips", {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        thisTrip
      ),
    })
      .then(response => response.json())
      .then(json => {
        console.log('Request success: ', json)
      })
      .catch(err => console.log('Request failure: ', err));
  }

  searchUserDetails(searchWord, travelersData) {
    let searchThis = searchWord.toLowerCase();
    return travelersData.travelers.filter(traveler => traveler.name.toLowerCase().includes(searchThis))
  }

  calculateYearsIncome() {
    let thisYearsTrips = this.tripsData.trips.filter(trip => trip.status === 'approved' && trip.date.includes(2020))
    let totalIncome = thisYearsTrips.reduce((totalSpent, curTrip) => {
      let trip = new Trip(curTrip, this.destinationsData);
      totalSpent += trip.calculateEstimatedCost()
      return totalSpent;
    }, 0) / 1.1 * 0.1
    return Math.floor(totalIncome)
  }

  displayTodaysTrips() {
    let presentTrips = this.tripsData.trips.filter(trip => {
      let datesInfo = this.getDateInformation(trip)
      if (datesInfo[0] > datesInfo[1] && datesInfo[0] < datesInfo[2]) {
        return trip
      }
    })
    return presentTrips;
  }
}




export default Agent;