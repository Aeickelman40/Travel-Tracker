import chai from 'chai';
const expect = chai.expect;

import Agent from '../src/agent.js';

let agent;

describe('Agent', () => {
  beforeEach(() => {
    agent = new Agent();
  });

  it('Should be a function', () => {
    expect(Agent).to.be.a('function');
  });

  it('Should be an instance of a user', () => {
    expect(agent).to.be.an.instanceOf(Agent);
  })
})