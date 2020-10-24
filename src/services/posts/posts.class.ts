import { Id, Params } from '@feathersjs/feathers';
import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import app from '../../app';
import { Application } from '../../declarations';

export class Posts extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }

  create(data:any, params?: Params ) { 

    

    return super.create(data, params)
  } 


}
