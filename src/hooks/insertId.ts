// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";

// eslint-disable-next-line @typescript-eslint/no-unused-vars

type Options = {
  serviceTargetName: string
  idField: string
  targetFieldToUpdate: string
}

export default (options: Options): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
     await context.app
      .service(options.serviceTargetName)
      .Model.findByIdAndUpdate(
        context.data[options.idField],
        { $push: { [options.targetFieldToUpdate]: context.result._id } },
        { new: true, useFindAndModify: true }
      );
    return context;
  };
};
