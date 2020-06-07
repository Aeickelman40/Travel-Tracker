import chai from 'chai';
const expect = chai.expect;

import User from '../src/user.js';

let trip1, trip2, trip3, trip4, trip5, tripsData, user;

describe('User', () => {
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
      "date": "2020/07/22",
      "duration": 11,
      "status": "pending",
      "suggestedActivities": []
    }

    tripsData = [trip1, trip2, trip3, trip4, trip5]

    user = new User({
      "id": 41, 
      "name": "Wadsworth Caddie", 
      "travelerType": "photographer"
    }, tripsData);
  });
      
  it('Should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('Should be an instance of a user', () => {
    expect(user).to.be.an.instanceOf(User);
  });

  it('Should have an id property', () => {
    expect(user.id).to.deep.equal(41)
  });

  it('Should have a name property', () => {
    expect(user.name).to.deep.equal('Wadsworth Caddie')
  });

  it('Should have a travelerType property', () => {
    expect(user.travelerType).to.deep.equal('photographer')
  });

  it('Should be able to display trips', () => {
    expect(user.displayTrips()).to.deep.equal([trip1, trip2, trip3])
  });

  it('Should be able to display requests', () => {
    expect(user.displayRequests()).to.deep.equal([trip5])
  });
})