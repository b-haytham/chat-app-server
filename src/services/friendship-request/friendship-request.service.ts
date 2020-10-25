// Initializes the `friendshipRequest` service on path `/friendship-request`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { FriendshipRequest } from './friendship-request.class';
import createModel from '../../models/friendship-request.model';
import hooks from './friendship-request.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'friendship-request': FriendshipRequest & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/friendship-request', new FriendshipRequest(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('friendship-request');

  service.hooks(hooks);
}
