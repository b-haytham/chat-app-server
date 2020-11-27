import { Application } from '../declarations';
import users from './users/users.service';
import posts from './posts/posts.service';
import comments from './comments/comments.service';
import messages from './messages/messages.service';
import rooms from './rooms/rooms.service';
import friendshipRequest from './friendship-request/friendship-request.service';
import followers from './followers/followers.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(posts);
  app.configure(comments);
  app.configure(messages);
  app.configure(rooms);
  app.configure(friendshipRequest);
  app.configure(followers);
}
