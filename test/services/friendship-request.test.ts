import assert from 'assert';
import app from '../../src/app';

describe('\'friendshipRequest\' service', () => {
  it('registered the service', () => {
    const service = app.service('friendship-request');

    assert.ok(service, 'Registered the service');
  });
});
