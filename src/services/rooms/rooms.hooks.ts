import * as authentication from '@feathersjs/authentication';
import { disallow, populate, PopulateSchema } from 'feathers-hooks-common';
import insertId from '../../hooks/insertId';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

const roomsSchema: Partial<PopulateSchema> = {
  include: [
    {
      service: 'users',
      nameAs:'creator',
      parentField: 'creator',
      childField: '_id'
    },
    {
      service: 'users',
      parentField: 'acceptor',
      nameAs: 'acceptor',

      childField: '_id'
    },
    {
      service: 'messages',
      parentField: 'messages',
      childField: '_id',
      asArray: true
    }
  ]
}

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [ disallow('external') ],
    update: [ disallow('external') ],
    patch: [ disallow('external') ],
    remove: []
  },

  after: {
    all: [populate({schema: roomsSchema})],
    find: [],
    get: [],
    create: [
      insertId({serviceTargetName: 'users', idField: 'creator', targetFieldToUpdate: 'rooms'}),
      insertId({serviceTargetName: 'users', idField: 'acceptor', targetFieldToUpdate: 'rooms'}),
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
