import * as authentication from '@feathersjs/authentication';
import { populate } from 'feathers-hooks-common';
import insertPostIdToUser from '../../hooks/insert-post-id-to-user';
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
    all: [
      populate({
        schema: {
          include:[{
            service: 'users',
            nameAs: 'owner',
            parentField: 'owner',
            childField: '_id'
          }]
        }
      })
    ],
    find: [],
    get: [],
    create: [insertPostIdToUser()],
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
