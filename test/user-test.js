import chai from 'chai';
const expect = chai.expect;

import User from '../src/user.js';

let user;

describe('User', () => {
  beforeEach(() => {
    user = new User();
  });
      
  it('Should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('Should be an instance of a user', () => {
    expect(user).to.be.an.instanceOf(User);
  })
})