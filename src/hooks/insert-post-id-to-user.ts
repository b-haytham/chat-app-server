// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const r = await context.app
      .service("users")
      .Model.findByIdAndUpdate(
        context.data.owner,
        { $push: { posts: context.result._id } },
        { new: true, useFindAndModify: true }
      );

    return context;
  };
};
