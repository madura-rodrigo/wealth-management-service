import { Instance, types } from "mobx-state-tree";
import { InvestmentModel } from "../models/investment.model";

export const InvesmentStore = types.model("InvesmentStore", {
  identifier: types.optional(types.identifier, "InvesmentStore"),
  investments: types.array(InvestmentModel),
});

export type Invesments = Instance<typeof InvesmentStore>;
