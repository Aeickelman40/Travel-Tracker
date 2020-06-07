import User from './user.js';
import Trip from './trip.js';

class Traveler extends User {
  constructor(user, tripsData, destinationsData) {
    super(user, tripsData, destinationsData)
    this.usersTrips = this.tripsData.filter(usertrip => usertrip.userID === this.id);
  }

  calculateTotalSpent() {
    let approvedTrips = this.usersTrips.filter(trip => trip.status === 'approved' && trip.date.includes('2020'));
    return approvedTrips.reduce((total, currentTrip) => {
      let trip = new Trip(currentTrip, this.destinationsData);
      total += trip.calculateEstimatedCost()
      return total;
    }, 0)
  }

  displayPreviousTrips() {
    let previousTrips = this.usersTrips.filter(trip => {
      let datesInfo = this.getDateInformation(trip)
      if (datesInfo[0] > datesInfo[2]) {
        return trip
      }
    })
    return previousTrips
  }

  displayPresentTrips() {
    let presentTrips = this.usersTrips.filter(trip => {
      let datesInfo = this.getDateInformation(trip)
      if (datesInfo[0] > datesInfo[1] && datesInfo[0] < datesInfo[2]) {
        return trip
      }
    })
    return presentTrips
  }

  displayUpcomingTrips() {
    let upcomingTrips = this.usersTrips.filter(trip => {
      let datesInfo = this.getDateInformation(trip)
      if (datesInfo[0] < datesInfo[1]) {
        return trip
      }
    })
    return upcomingTrips
  }
}

export default Traveler;