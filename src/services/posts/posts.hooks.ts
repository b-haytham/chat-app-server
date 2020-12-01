import * as authentication from "@feathersjs/authentication";
import {
  populate,
  PopulateSchema,
  preventChanges,
} from "feathers-hooks-common";
import insertId from "../../hooks/insertId";
import IsAuthorized from "../../hooks/IsAuthorized";
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

const postSchema: Partial<PopulateSchema> = {
  include: [
    {
      service: "users",
      nameAs: "owner",
      parentField: "owner",
      childField: "_id",
      query: {
        $select: ["_id", "username", "avatar"],
      },
    },
  ],
};

export default {
  before: {
    all: [authenticate("jwt")],
    find: [],
    get: [],
    create: [],
    update: [
      IsAuthorized({ serviceToProtect: "posts", fieldToCheck: "owner" }),
    ],
    patch: [
      IsAuthorized({ serviceToProtect: "posts", fieldToCheck: "owner" }),
      preventChanges(true, ...["owner", "comments"]),
    ],
    remove: [
      IsAuthorized({ serviceToProtect: "posts", fieldToCheck: "owner" }),
    ],
  },

  after: {
    all: [],
    find: [populate({ schema: postSchema })],
    get: [],
    create: [
      insertId({
        serviceTargetName: "users",
        idField: "owner",
        targetFieldToUpdate: "posts",
      }),
    ],
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
