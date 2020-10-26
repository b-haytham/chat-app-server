import * as authentication from '@feathersjs/authentication';
import { populate } from 'feathers-hooks-common';
import insertId from '../../hooks/insertId';
import IsAuthorized from '../../hooks/IsAuthorized';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [ authenticate('jwt')],
    find: [],
    get: [],
    create: [],
    update: [IsAuthorized({serviceToProtect: 'posts', fieldToCheck: 'owner'}) ],
    patch: [IsAuthorized({serviceToProtect: 'posts', fieldToCheck: 'owner'}) ],
    remove: [IsAuthorized({serviceToProtect: 'posts', fieldToCheck: 'owner'}) ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [insertId({serviceTargetName: 'users', idField: 'owner' , targetFieldToUpdate: 'posts'})],
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
