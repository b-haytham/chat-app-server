// messages-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Document, Model, Mongoose } from 'mongoose';
import { UserType } from './users.model';
import { RoomType } from './rooms.model';


export interface MessageType extends Document {
  sender: UserType
  reciever: UserType[]
  room: RoomType
  centent: string
}

export default function (app: Application): Model<MessageType> {
  const modelName = 'messages';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'Users' },
    reciever: { type: Schema.Types.ObjectId, ref: 'Users' },
    room: { type: Schema.Types.ObjectId, ref: 'Rooms'},
    text: { type: String, required: true }
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }
  return mongooseClient.model<MessageType>(modelName, schema);
}
