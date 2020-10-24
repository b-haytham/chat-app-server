// users-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Document, Model, Mongoose, Schema } from 'mongoose';
import { PostType } from './posts.model';


export interface UseType extends Document {
  username: string
  email: string 
  password: string
  avatar: string,
  posts:  PostType[]
}

export default function (app: Application): Model<UseType> {
  const modelName = 'users';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const schema = new mongooseClient.Schema({
    username: { type: String, required: true },
    email: { type: String, unique: true, lowercase: true, required: true },
    password: { type: String },
    avatar: {type: String},
    posts: [{ type: Schema.Types.ObjectId, ref: 'Posts' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }]
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }
  return mongooseClient.model<UseType>(modelName, schema);
}
