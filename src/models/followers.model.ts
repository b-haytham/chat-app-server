// followers-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from "../declarations";
import { Model, Mongoose } from "mongoose";
import { UserType } from "./users.model";

export interface FriendshipRequestType extends Document {
  sender: UserType;
  reciever: UserType;
}

export default function (app: Application): Model<any> {
  const modelName = "followers";
  const mongooseClient: Mongoose = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      sender: { type: String, required: true },
      reciever: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }
  return mongooseClient.model<any>(modelName, schema);
}
