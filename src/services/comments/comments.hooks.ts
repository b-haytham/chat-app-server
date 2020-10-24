import * as authentication from '@feathersjs/authentication';
import { populate } from 'feathers-hooks-common';
import insertCommentId from '../../hooks/insert-comment-id';
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
    all: [populate({
      schema: {
        include: [
          {
            service: 'users',
            nameAs: 'owner',
            parentField: 'owner',
            childField: '_id'
          },
            {
              service: 'posts',
              nameAs: 'post',
              parentField: 'post',
              childField: '_id'
            }
          

        ]
      }
    })],
    find: [],
    get: [],
    create: [insertCommentId()],
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
