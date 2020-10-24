// posts-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Document, Model, Mongoose } from 'mongoose';
import { UseType } from './users.model';

export interface PostType extends Document {
  title: string
  description: string
  content: string
  owner: UseType
}

export default function (app: Application): Model<PostType> {
  const modelName = 'posts';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    title: {type: String, required: true},
    content: { type: String, required: true },
    description: { type: String, required: true },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Users"
    }
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }
  return mongooseClient.model<PostType>(modelName, schema);
}
