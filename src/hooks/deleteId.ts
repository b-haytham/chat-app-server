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
    console.log(context.result)  
    if(context.result.isAccepted){
          const userDoc =  await context.app
           .service(options.serviceTargetName)
           .Model.findById(context.result[options.idField]).exec();

           console.log('DELETE ID HOOK', userDoc)

          userDoc[options.targetFieldToUpdate].pull(context.result._id)
          await userDoc.save() 
      }
    return context;
  };
};
