import * as feathersAuthentication from "@feathersjs/authentication";
import * as local from "@feathersjs/authentication-local";
import { populate, preventChanges } from "feathers-hooks-common";
import IsAuthorized from "../../hooks/IsAuthorized";
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = feathersAuthentication.hooks;
const { hashPassword, protect } = local.hooks;

const useSchema = {
  include: {
    service: "posts",
    nameAs: "posts",
    parentField: "posts",
    childField: "_id",
  },
};

export default {
  before: {
    all: [],
    find: [authenticate("jwt")],
    get: [authenticate("jwt")],
    create: [hashPassword("password")],
    update: [
      hashPassword("password"),
      authenticate("jwt"),
      IsAuthorized({ serviceToProtect: "users", fieldToCheck: "_id" }),
    ],
    patch: [
      hashPassword("password"),
      authenticate("jwt"),
      IsAuthorized({ serviceToProtect: "users", fieldToCheck: "_id" }),
      preventChanges(
        true,
        ...[
          "email",
          "requestsSent",
          "requestsRecieved",
          "followers",
          "follows",
          "posts",
          "comments",
          "rooms",
          "messagesSent",
          "messagesRecieved"
        ]
      ),
    ],
    remove: [
      authenticate("jwt"),
      IsAuthorized({ serviceToProtect: "users", fieldToCheck: "_id" }),
    ],
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect("password"),
      populate({ schema: useSchema }),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
