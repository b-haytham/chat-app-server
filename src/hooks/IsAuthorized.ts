// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Forbidden } from "@feathersjs/errors";
import { Hook, HookContext } from "@feathersjs/feathers";

// eslint-disable-next-line @typescript-eslint/no-unused-vars

type Options = {
    serviceToProtect: string
    fieldToCheck: string
}

export default (options: Options): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    

    const q = await context.service.Model.findById(context.id)

    //console.log(q)
    //console.log(q._id)
    console.log(context.params.user)
    
    if(!context.params.user._id.equals(q[options.fieldToCheck])){
      throw new Forbidden()
    }


    //console.log(q[options.fieldToCheck] == context.params.user._id)
  

    return context;
  };
};
