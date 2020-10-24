// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {

    await context.app.service('users').Model.findByIdAndUpdate(
      context.data.owner,
      { $push: { comments: context.result._id } },
      { new: true, useFindAndModify: true }
    )

    await context.app.service('posts').Model.findByIdAndUpdate(
      context.data.post,
      { $push: { comments: context.result._id } },
      { new: true, useFindAndModify: true }
    )

    return context;
  };
};
