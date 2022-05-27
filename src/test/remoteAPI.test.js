import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinonChai from 'sinon-chai';
import app from '../server';
import validateData from '../utils/validateData';

chai.use(sinonChai);
chai.use(chaiHttp);
chai.should();

describe('Empty string fails validation', () => {
  it('Should return false when you pass ""', () => {
    expect(validateData('')).equals(false);
  });
});

describe('Data of type object fails validation', () => {
  it('Should return false when you pass {data: "new1"}', () => {
    expect(validateData({ data: 'new1' })).equals(false);
  });
});

describe('"new1" passes validation', () => {
  it('Should return true when you pass "new1"', () => {
    expect(validateData('new1')).equals(true);
  });
});

describe('"new2" passes validation', () => {
  it('Should return true when you pass "new2"', () => {
    expect(validateData('new2')).equals(true);
  });
});

describe('Controller handles bad request properly', () => {
  it('Returns error data with empty data string', () => {
    const payload = {
      new1: 'new1',
      new2: '',
    };
    chai
      .request(app)
      .put('/api/v1/update_remote_api')
      .send(payload)
      .end((error, response) => {
        expect(response.body.message).equals(
          'Each input passed must be a valid string with minimum of 1 character.'
        );
      });
  });
});

describe('Controller handles good request properly', () => {
  it('Returns error when provided input is okay due to hypothetical endpoint.', () => {
    const payload = {
      new1: 'new1',
      new2: 'new2',
    };
    chai
      .request(app)
      .put('/api/v1/update_remote_api')
      .send(payload)
      .end((error, response) => {
        expect(response.body.message).equals('API call failed API call error.');
      });
  });
});
