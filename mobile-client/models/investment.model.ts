import { Instance, types } from "mobx-state-tree";

export const InvestmentModel = types.model("InvestimentModel", {
  amount: types.number,
  date: types.Date,
});

export type Investment = Instance<typeof InvestmentModel>;
