var moment = require('moment');

class User {
  constructor(user, tripsData, destinationsData) {
    this.id = user.id;
    this.name = user.name;
    this.travelerType = user.travelerType;
    this.tripsData = tripsData;
    this.destinationsData = destinationsData;
  }

  displayTrips() {
    if (this.id === 0) {
      return this.tripsData.filter(trip => trip.status === 'approved')
    } else {
      return this.tripsData.filter(trip => trip.status === 'approved' && trip.userID === this.id)
    }
  }

  displayRequests() {
    if (this.id === 0) {
      return this.tripsData.filter(trip => trip.status === 'pending')
    } else {
      return this.tripsData.filter(trip => trip.status === 'pending' && trip.userID === this.id)
    }
  }

  getDateInformation(thisTrip) {
    let todaysDate = moment();
    let tripStartDate = moment(thisTrip.date, 'YYYY/MM/DD');
    let tripEndDate = moment(thisTrip.date, 'YYYY/MM/DD').add(thisTrip.duration, 'days')
    return [todaysDate, tripStartDate, tripEndDate]
  }
}

export default User;