import { Instance, types } from "mobx-state-tree";
import { InvesmentStore } from "./investment.store";
import { UserModel } from "./user.store";

export const RootStore = types.model("RootStore", {
  identifier: types.optional(types.identifier, "RootStore"),
  userStore: types.optional(UserModel, () =>
    UserModel.create({ firstName: "", lastName: "", email: "" })
  ),
  investmentStore: types.optional(InvesmentStore, () =>
    InvesmentStore.create({ investments: [] })
  ),
});

export type Root = Instance<typeof RootStore>;
