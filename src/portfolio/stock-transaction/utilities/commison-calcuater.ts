import { Injectable } from '@nestjs/common';
import { StockTransactionResponse } from '../dto/stock-transaction-response.dto';
import { StockTransaction } from '../model/stock-transaction.model';

export const COMMISON_CALCULATOR = 'COMMISON_CALCULATOR';

export interface CommisonCalculator {
  calculate(txn: StockTransaction[]): StockTransactionResponse[];
}

@Injectable()
export class CSECommisonCalculator implements CommisonCalculator {
  calculate(txns: StockTransaction[]): StockTransactionResponse[] {
    const totalCommision = 1.12;
    const shareTransactionLeavy = 0.3;
    type BuySellInfo = {
      date: Date;
      quantity: number;
      transactionType: string;
    };
    let transactionsResponse: StockTransactionResponse[] = [];
    const groupedByDate = this.groupBy(txns, 'date');
    groupedByDate.forEach((group) => {
      const groupedByTransactionType = this.groupBy(group, 'type');
      if (groupedByTransactionType.length === 2) {
        let buySellGroups = [];
        groupedByTransactionType.forEach((values: StockTransaction[]) => {
          buySellGroups.push(
            values.reduce(
              (buySellInfo: BuySellInfo, item: StockTransaction) => {
                buySellInfo.quantity += item.quantity;
                buySellInfo.transactionType = item.type;
                buySellInfo.date = item.date;
                return buySellInfo;
              },
              { quantity: 0, transactionType: '', date: null },
            ),
          );
        });

        const min: BuySellInfo = buySellGroups.find(
          (item) =>
            item.quantity ==
            Math.min(...buySellGroups.map((obj) => obj.quantity)),
        );

        txns.forEach((item) => {
          const stktxnResponse = this.transform(item);

          if (item.date.getDate() === min.date.getDate()) {
            if (min.transactionType == item.type) {
              stktxnResponse.commison =
                ((item.tradedPrice * item.quantity) / 100) *
                shareTransactionLeavy;
            } else {
              stktxnResponse.commison =
                ((item.tradedPrice * item.quantity) / 100) * totalCommision;
              transactionsResponse.push(stktxnResponse);
            }
          }
        });
      } else {
        txns.forEach((item) => {
          const stktxnResponse = this.transform(item);
          stktxnResponse.commison =
            ((item.tradedPrice * item.quantity) / 100) * totalCommision;
          transactionsResponse.push(stktxnResponse);
        });
      }
    });

    return transactionsResponse;
  }

  private groupBy = <T>(array: T[], value: string) => {
    let group = array.reduce((storage, item: T) => {
      (storage[item[value]] = storage[item[value]] || []).push(item);
      return storage;
    }, {});
    let groups = [];
    for (let key of Object.keys(group)) {
      groups.push(Object.entries(group[key]).map((entry) => entry[1]));
    }
    return groups;
  };

  private transform = (source: StockTransaction): StockTransactionResponse => {
    const { securityId, quantity, date, type, tradedPrice } = source;

    return new StockTransactionResponse(
      securityId,
      quantity,
      date,
      type,
      tradedPrice,
    );
  };
}
