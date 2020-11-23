import { Id, Params } from "@feathersjs/feathers";
import { Service, MongooseServiceOptions } from "feathers-mongoose";
import app from "../../app";
import { Application } from "../../declarations";

import { promises } from "fs";

export class Posts extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }

  //@ts-ignore
  async create(data: any, params?: Params) {
    const path = `http://192.168.1.17:3030/uploads/${data.data.name}`;

    try {
      await promises.writeFile(
        `./public/uploads/${data.data.name}`,
        data.data.base64,
        {
          encoding: "base64",
        }
      );

      data.content = path;
      delete data.data;
      return super.create(data, params);
    } catch (error) {
      console.error(error);
    }
  }
}
