import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import app from '../server';
import remoteAPI from '../controller/remoteAPI';

chai.use(sinonChai);
chai.use(chaiHttp);
chai.should();

const { updateRemoteApi } = remoteAPI;

describe('Test update remote API', () => {
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
        expect(response.body).to.have.property('status');
        expect(response.body).to.have.property('message');
        expect(response.body).to.have.property('data');
      });
  });

  it('Fakes an incomplete request', async () => {
    const req = {
      new1: 'new1',
      new2: 'new2',
    };

    const res = {
      status: 'fail',
      message: 'error message',
      json: () => {},
    };

    sinon.stub(res, 'status').returnsThis();
    sinon.stub(res, 'message').returnsThis();

    await updateRemoteApi(req, res);
    expect(res.status).to.be('fail');
  });
});
