// rooms-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Document, Model, Mongoose } from 'mongoose';
import { UserType } from './users.model';
import { MessageType } from './messages.model';


export interface RoomType extends Document {
  creator: UserType
  acceptor: UserType
  messages: MessageType[]
  
}


export default function (app: Application): Model<RoomType> {
  const modelName = 'rooms';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    creator: { type: Schema.Types.ObjectId, ref: 'Users' },
    acceptor: { type: Schema.Types.ObjectId, ref: 'Users' },
    messages: [{ type: Schema.Types.ObjectId, ref: 'Messages' }]
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }
  return mongooseClient.model<RoomType>(modelName, schema);
}
