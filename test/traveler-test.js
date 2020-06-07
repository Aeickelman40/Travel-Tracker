import chai from 'chai';
const expect = chai.expect;
import Traveler from '../src/traveler';
// use spies within this suite

let trip1, trip2, trip3, trip4, trip5, tripsData, destination1, destination2, destinationsData, traveler;

describe('Traveler', () => {

  beforeEach(() => {
    trip1 = {
      "id": 20,
      "userID": 41,
      "destinationID": 19,
      "travelers": 4,
      "date": "2020/10/05",
      "duration": 6,
      "status": "approved",
      "suggestedActivities": []
    },

    trip2 = {
      "id": 160,
      "userID": 41,
      "destinationID": 28,
      "travelers": 6,
      "date": "2019/10/12",
      "duration": 17,
      "status": "approved",
      "suggestedActivities": []
    },

    trip3 = {
      "id": 181,
      "userID": 41,
      "destinationID": 23,
      "travelers": 4,
      "date": "2019/11/29",
      "duration": 7,
      "status": "approved",
      "suggestedActivities": []
    },

    trip4 = {
      "id": 182,
      "userID": 9,
      "destinationID": 45,
      "travelers": 6,
      "date": "2021/01/15",
      "duration": 5,
      "status": "approved",
      "suggestedActivities": []
    },

    trip5 = {
      "id": 183,
      "userID": 41,
      "destinationID": 10,
      "travelers": 4,
      "date": "2020/06/07",
      "duration": 11,
      "status": "pending",
      "suggestedActivities": []
    }

    tripsData = [trip1, trip2, trip3, trip4, trip5];

    destination1 = {
      "alt": "overview of city buildings with a clear sky",
      "destination": "Lima, Peru",
      "estimatedFlightCostPerPerson": 400,
      "estimatedLodgingCostPerDay": 70,
      "id": 1,
      "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd"
    },

    destination2 = {
      "alt": "city with boats on the water during the day time",
      "destination": "Stockholm, Sweden",
      "estimatedFlightCostPerPerson": 780,
      "estimatedLodgingCostPerDay": 100,
      "id": 2,
      "image": "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&aut"
    }

    destinationsData = [destination1, destination2]
    
    traveler = new Traveler({
      "id": 41,
      "name": "Wadsworth Caddie",
      "travelerType": "photographer"
    }, tripsData, destinationsData)
  });

  it('should be a function', () => {
    expect(Traveler).to.be.a('function')
  });

  it('should be an instantiation of Traveler class', () => {
    expect(traveler).to.be.an.instanceof(Traveler)
  });

  it('should have a property that contains that users trips', () => {
    expect(traveler.usersTrips).to.deep.equal([trip1, trip2, trip3, trip5])
  });

  it('should be able to calculate the total amount they spent so far', () => {
    expect(traveler.calculateTotalSpent()).to.deep.equal(20889)
  });

  it('should be able to return trips that have already passed', () => {
    expect(traveler.displayPreviousTrips()).to.deep.equal([trip2, trip3])
  })

  it('should be able to return trips that are currently taking place', () => {
    expect(traveler.displayPresentTrips()).to.deep.equal([trip5])
  })

  it('should be able to return trips that are in the future', () => {
    expect(traveler.displayUpcomingTrips()).to.deep.equal([trip1])
  })
})