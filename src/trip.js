class Trip {
  constructor(trip, destinationsData) {
    this.id = trip.id;
    this.userID = trip.userID;
    this.destinationID = trip.destinationID;
    this.travelers = trip.travelers;
    this.date = trip.date;
    this.duration = trip.duration;
    this.status = trip.status;
    this.suggestedActivities = trip.suggestedActivities;
    this.destinationsData = destinationsData;
  }

  calculateEstimatedCost() {
    let thisDestination = this.destinationsData.find(location => location.id === this.destinationID);
    let flightCost = thisDestination.estimatedFlightCostPerPerson * this.travelers;
    let lodgingCost = thisDestination.estimatedLodgingCostPerDay * this.duration;
    let totalCost = Math.floor((flightCost + lodgingCost) * 1.1)
    return  totalCost
  }

  returnDestinationDetails() {
    return this.destinationsData.find(destination => destination.id === this.destinationID)
  }
}

export default Trip;