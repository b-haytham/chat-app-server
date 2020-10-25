import assert from 'assert';
import app from '../../src/app';

describe('\'rooms\' service', () => {
  it('registered the service', () => {
    const service = app.service('rooms');

    assert.ok(service, 'Registered the service');
  });
});
