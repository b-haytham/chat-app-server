import * as authentication from '@feathersjs/authentication';
import insertId from '../../hooks/insertId';
import IsAuthorized from '../../hooks/IsAuthorized';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [],
    update: [IsAuthorized({serviceToProtect: 'friendship-request', fieldToCheck: 'reciever'})],
    patch: [IsAuthorized({serviceToProtect: 'friendship-request', fieldToCheck: 'reciever'})],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      insertId({serviceTargetName: 'users', idField: 'sender', targetFieldToUpdate: 'requestsSent' }),
      insertId({serviceTargetName: 'users', idField: 'reciever', targetFieldToUpdate: 'requestsRecieved' })
    ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
