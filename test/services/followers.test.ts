import assert from 'assert';
import app from '../../src/app';

describe('\'followers\' service', () => {
  it('registered the service', () => {
    const service = app.service('followers');

    assert.ok(service, 'Registered the service');
  });
});
