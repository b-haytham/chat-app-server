// users-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Document, Model, Mongoose, Schema } from 'mongoose';
import { PostType } from './posts.model';
import { CommentType } from './comments.model';
import { RoomType } from './rooms.model';
import { MessageType } from './messages.model';


export interface UserType extends Document {
  username: string
  email: string 
  password: string
  avatar: string,
  posts:  PostType[]
  comments: CommentType[]
  rooms: RoomType[]
  messages: MessageType[]
}

export default function (app: Application): Model<UserType> {
  const modelName = 'users';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const schema = new mongooseClient.Schema({
    username: { type: String, required: true },
    email: { type: String, unique: true, lowercase: true, required: true },
    password: { type: String },
    avatar: {type: String},
    posts: [{ type: Schema.Types.ObjectId, ref: 'Posts' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
    rooms: [{ type: Schema.Types.ObjectId, ref: 'Rooms' }],
    messages: [{type: Schema.Types.ObjectId, Ref: 'Messages'}]
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }
  return mongooseClient.model<UserType>(modelName, schema);
}
