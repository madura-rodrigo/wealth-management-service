import { Instance, types } from "mobx-state-tree";

export const UserModel = types.model("User", {
  firstName: types.string,

  lastName: types.string,

  email: types.string,
});

export type User = Instance<typeof UserModel>;
