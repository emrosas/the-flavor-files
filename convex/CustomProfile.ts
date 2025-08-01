import { Password } from "@convex-dev/auth/providers/Password";
import { DataModel } from "./_generated/dataModel";

export default Password<DataModel>({
  profile(params) {
    return {
      email: params.email as string,
      username: params.username as string,
    };
  },
});
