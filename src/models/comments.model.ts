// comments-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Document, Model, Mongoose } from 'mongoose';
import { UserType } from './users.model';
import { PostType } from './posts.model';

export interface CommentType extends Document {
  text: string 
  owner: UserType
  post: PostType
}


export default function (app: Application): Model<CommentType> {
  const modelName = 'comments';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    text: { type: String, required: true },
    owner: {type: Schema.Types.ObjectId, ref: 'Users'},
    post: {type: Schema.Types.ObjectId, ref: 'Posts'}
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }
  return mongooseClient.model<CommentType>(modelName, schema);
}
