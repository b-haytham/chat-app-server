import "@feathersjs/transport-commons";
import { HookContext } from "@feathersjs/feathers";
import { Application } from "./declarations";

export default function (app: Application): void {
  if (typeof app.channel !== "function") {
    // If no real-time functionality has been configured just return
    return;
  }

  app.on("connection", (connection: any): void => {
    // On a new real-time connection, add it to the anonymous channel
    app.channel("anonymous").join(connection);
  });

  app.on("login", (authResult: any, { connection }: any): void => {
    // connection can be undefined if there is no
    // real-time connection, e.g. when logging in via REST
    if (connection) {
      // Obtain the logged in user from the connection
      // const user = connection.user;
      const { user } = connection;
      // The connection is no longer anonymous, remove it
      app.channel("anonymous").leave(connection);

      // Add it to the authenticated user channel
      app.channel("authenticated").join(connection);

      // Channels can be named anything and joined on any condition

      // E.g. to send real-time events only to admins use
      // if(user.isAdmin) { app.channel('admins').join(connection); }

      // If the user has joined e.g. chat rooms
      // if(Array.isArray(user.rooms)) user.rooms.forEach(room => app.channel(`rooms/${room.id}`).join(connection));
      if (Array.isArray(user.rooms) && user.rooms.length > 0)
        user.rooms.forEach((room: any) =>
          app.channel(`rooms/${room._id}`).join(connection)
        );
      // Easily organize users by email and userid for things like messaging
      app.channel(`emails/${user.email}`).join(connection);
      app.channel(`userIds/${user._id}`).join(connection);
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //app.publish((data: any, hook: HookContext) => {
  // Here you can add event publishers to channels set up in `channels.ts`
  // To publish only for a specific event use `app.publish(eventname, () => {})`

  //console.log(
  // "Publishing all events to all authenticated users. See `channels.ts` and https://docs.feathersjs.com/api/channels.html for more information."
  // ); // eslint-disable-line

  // e.g. to publish all service events to all authenticated users use
  //return app.channel("authenticated");
  //});

  // Here you can also add service specific event publishers
  // e.g. the publish the `users` service `created` event to the `admins` channel
  // app.service('users').publish('created', () => app.channel('admins'));

  // With the userid and email organization from above you can easily select involved users
  app.service("messages").publish((data, context) => {
    return [
      app.channel(`userIds/${data.sender}`),
      app.channel(`userIds/${data.reciever}`),
    ];
  });

  app.service("followers").publish((data, context) => {
    return [
      app.channel(`userIds/${data.sender}`),
      app.channel(`userIds/${data.reciever}`),
    ];
  });

  app.service("posts").publish(async (data, context) => {
    const user = await app.service("users").get(data.owner);
    return app.channel("authenticated").send({
      ...data,
      owner: {
        _id: user._id,
        username: user.username,
        avatar: user.avatar,
      },
    });
  });

  app.service("friendship-request").publish(async (data, context) => {
    return [
      app.channel(`userIds/${data.sender._id}`),
      app.channel(`userIds/${data.reciever._id}`),
    ];
  });

  app.service("rooms").publish(async (data, context) => {
    return [
      app.channel(`userIds/${data.creator._id}`).send(data),
      app.channel(`userIds/${data.acceptor._id}`).send(data),
    ];
  });
}
