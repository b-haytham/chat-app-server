import * as authentication from '@feathersjs/authentication';
import { disallow, preventChanges } from 'feathers-hooks-common';
import deleteId from '../../hooks/deleteId';
import insertId from '../../hooks/insertId';
import IsAuthorized from '../../hooks/IsAuthorized';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [ disallow('external') ],
    get: [ disallow('external') ],
    create: [],
    update: [disallow('external')],
    patch: [
      IsAuthorized({serviceToProtect: 'friendship-request', fieldToCheck: 'reciever'}),
      preventChanges(true, ...["sender", "reciever"])
    ],
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
    patch: [
      deleteId({serviceTargetName: 'users', idField: 'sender', targetFieldToUpdate: 'requestsSent'}),
      deleteId({serviceTargetName: 'users', idField: 'reciever', targetFieldToUpdate: 'requestsRecieved'})
    ],
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
