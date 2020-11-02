import { Id, Params } from '@feathersjs/feathers';
import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import app from '../../app';
import { Application } from '../../declarations';
import { FriendshipRequestType } from '../../models/friendship-request.model';

export class FriendshipRequest extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }

  //@ts-ignore
  async patch(id: Id, data: Partial<any>, params?:Params){

    console.log('PATCH ID', id)
    console.log('PATCH DATA', data)

    if(data.isAccepted){

      const request: FriendshipRequestType = await app.service('friendship-request').get(id)

      console.log(request)

      const room  =  await app.service('rooms').create({
        creator: request.sender,
        acceptor: request.reciever,
        friendshipRequestAssociated: id
      })
      console.log(room)
    }


    return super.patch(id, data, params)
  }

}
