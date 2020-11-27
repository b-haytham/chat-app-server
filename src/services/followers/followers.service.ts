// Initializes the `followers` service on path `/followers`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Followers } from './followers.class';
import createModel from '../../models/followers.model';
import hooks from './followers.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'followers': Followers & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/followers', new Followers(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('followers');

  service.hooks(hooks);
}
