import chai from 'chai';
const expect = chai.expect;

import Traveler from '../src/traveler.js';

let traveler;

describe('Traveler', () => {
  beforeEach(() => {
    traveler = new Traveler();
  });

  it('Should be a function', () => {
    expect(Traveler).to.be.a('function');
  });

  it('Should be an instance of a user', () => {
    expect(traveler).to.be.an.instanceOf(Traveler);
  })
})