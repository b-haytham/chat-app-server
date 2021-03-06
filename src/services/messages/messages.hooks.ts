import * as authentication from '@feathersjs/authentication';
import { disallow, preventChanges } from 'feathers-hooks-common';
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
    update: [ disallow('external') ],
    patch: [ disallow('external') ],
    remove: [ IsAuthorized({serviceToProtect: 'messages', fieldToCheck: 'sender'}) ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      insertId({serviceTargetName: 'users', idField: 'sender', targetFieldToUpdate: 'messagesSent'}),
      insertId({serviceTargetName: 'users', idField: 'reciever', targetFieldToUpdate: 'messagesRecieved'}),
      insertId({serviceTargetName: 'rooms', idField: 'room', targetFieldToUpdate: 'messages'})
    ],
    update: [],
    patch: [ ],
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
