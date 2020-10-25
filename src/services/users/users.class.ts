import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';
import crypto from 'crypto'
import { Id, Params } from '@feathersjs/feathers';
import { UserType } from '../../models/users.model';
import app from '../../app';


// The Gravatar image service
const gravatarUrl = 'https://s.gravatar.com/avatar';
// The size query. Our chat needs 60px images
const query = 's=60';
// Returns the Gravatar image for an email
const getGravatar = (email: string) => {
  // Gravatar uses MD5 hashes from an email address (all lowercase) to get the image
  const hash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
  // Return the full avatar URL
  return `${gravatarUrl}/${hash}?${query}`;
}

// A type interface for our user (it does not validate any data)
interface UserData {
  
  username: string
  email: string;
  password: string;
  avatar?: string;  
}


export class Users extends Service{
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }


  //@ts-ignore
  async create( data: UserData, params?: Params ) {

    const { email, password, username } = data;
    // Use the existing avatar image or return the Gravatar for the email
    const avatar = data.avatar || getGravatar(email);
    // The complete user
    const userData = {
      username,
      email,
      password,
      avatar
    };

    return super.create(userData, params)
  }

}
