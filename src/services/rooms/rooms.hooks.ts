import * as authentication from '@feathersjs/authentication';
import insertId from '../../hooks/insertId';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      insertId({serviceTargetName: 'users', idField: 'creator', targetFieldToUpdate: 'rooms'}),
      insertId({serviceTargetName: 'users', idField: 'acceptor', targetFieldToUpdate: 'rooms'})
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
