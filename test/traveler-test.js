import chai from 'chai';
const expect = chai.expect;

import Traveler from '../src/traveler';
import User from '../src/user';

let trip1, trip2, trip3, trip4, trip5, trip6, trip7, tripsData, destination1, destination2, destinationsData, traveler;

describe('Traveler', () => {
  beforeEach(() => {
    trip1 = {
      "id": 31,
      "userID": 11,
      "destinationID": 33,
      "travelers": 3,
      "date": "2020/12/19",
      "duration": 15,
      "status": "approved",
      "suggestedActivities": []
    }
    trip2 = {
      "id": 40,
      "userID": 29,
      "destinationID": 50,
      "travelers": 3,
      "date": "2020/10/31",
      "duration": 13,
      "status": "approved",
      "suggestedActivities": []
    }
    trip3 = {
      "id": 41,
      "userID": 3,
      "destinationID": 25,
      "travelers": 3,
      "date": "2020/08/30",
      "duration": 11,
      "status": "approved",
      "suggestedActivities": []
    }
    trip4 = {
      "id": 42,
      "userID": 11,
      "destinationID": 32,
      "travelers": 1,
      "date": "2020/08/08",
      "duration": 14,
      "status": "approved",
      "suggestedActivities": []
    }
    trip5 = {
      "id": 42,
      "userID": 11,
      "destinationID": 32,
      "travelers": 1,
      "date": "2019/08/08",
      "duration": 14,
      "status": "approved",
      "suggestedActivities": []
    }
    trip6 = {
      "id": 42,
      "userID": 11,
      "destinationID": 32,
      "travelers": 1,
      "date": "2020/06/07",
      "duration": 14,
      "status": "approved",
      "suggestedActivities": []
    }
    trip7 = {
      "id": 45,
      "userID": 12,
      "destinationID": 37,
      "travelers": 1,
      "date": "2020/02/28",
      "duration": 14,
      "status": "pending",
      "suggestedActivities": []
    }

    tripsData = [trip1, trip2, trip3, trip4, trip5, trip6, trip7];

    destination1 = {
      "id": 32,
      "destination": "Kathmandu, Nepal",
      "estimatedLodgingCostPerDay": 45,
      "estimatedFlightCostPerPerson": 1200,
      "image": "https://images.unsplash.com/photo-1558799401-1dcba79834c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
      "alt": "temple with buntings during daytime"
    },
    destination2 = {
      "id": 33,
      "destination": "Brussels, Belgium",
      "estimatedLodgingCostPerDay": 1000,
      "estimatedFlightCostPerPerson": 110,
      "image": "https://images.unsplash.com/photo-1559113202-c916b8e44373?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      "alt": "brown concrete gate"
    }

    destinationsData = [destination1, destination2]

    traveler = new Traveler({
      "id": 11,
      "name": "Joy Dovington",
      "travelerType": "history buff"
    }, tripsData, destinationsData)
  });

  it('should be a function', () => {
    expect(Traveler).to.be.a('function')
  });

  it('should be an instantiation of Traveler class', () => {
    expect(traveler).to.be.an.instanceof(Traveler)
  });

  it('should have a property that contains that users trips', () => {
    expect(traveler.usersTrips).to.deep.equal([trip1, trip4, trip5, trip6])
  });

  it('should be able to calculate the total amount they spent so far', () => {
    expect(traveler.calculateTotalSpent()).to.deep.equal(20889)
  });

  it('should be able to return trips that have already passed', () => {
    expect(traveler.displayPreviousTrips()).to.deep.equal([trip5])
  });

  it('should be able to return trips that are currently taking place', () => {
    expect(traveler.displayPresentTrips()).to.deep.equal([trip6])
  });

  it('should be able to return trips that are in the future', () => {
    expect(traveler.displayUpcomingTrips()).to.deep.equal([trip1, trip4])
  });

})