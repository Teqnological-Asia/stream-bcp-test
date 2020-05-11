import moment from "moment";
import {roundedPercentage, addComma} from '../../../utils'
export const getHeaderTable = (transitions) => {
  let dates = ["日付"];
  transitions.map((transition) =>
    dates.push(moment(transition.date).format("YYYY-MM-DD"))
  );
  return dates;
};

export const transformTransitions = (transitions) => {
  if (transitions.length > 0) {
    let result = [];

    let collateralCashes = ["使用可能現金保証金"];
    let collaterals = ["代用証券評価額"];
    let marginTradePositionPLs = ["未決済建玉評価損"];
    let marginTradePositionExpenses = ["諸経費"];
    let marginTradeUnsettledLosses = ["未受渡建玉決済損"];
    let marginTradeUnsettledProfits = ["未受渡縦建玉決済益"];
    let marginReceiveds = ["受入保証金"];
    let marginRequireds = ["保証金維持必要額"];
    let cashMarginRequireds = ["必要現金保証金"];
    let withdrawables = ["追証余力"];
    let marginTradePositionAmounts = ["建玉代金"];
    let marginRates = ["保証金預託率"];

    transitions.map((transition) => {
      const subCollateral = addComma((transition.collateralCash - transition.collateral).toString());
      const modifiedMarginRate = addComma(roundedPercentage(transition.marginRate))
      collateralCashes.push(addComma(transition.collateralCash));
      collaterals.push(subCollateral);
      marginTradePositionPLs.push(addComma(transition.marginTradePositionPL));
      marginTradePositionExpenses.push(addComma(transition.marginTradePositionExpense));
      marginTradeUnsettledLosses.push(addComma(transition.marginTradeUnsettledLoss));
      marginTradeUnsettledProfits.push(addComma(transition.marginTradeUnsettledProfit));
      marginReceiveds.push(addComma(transition.marginReceived));
      marginRequireds.push(addComma(transition.marginRequired));
      cashMarginRequireds.push(addComma(transition.cashMarginRequired));
      withdrawables.push(addComma(transition.withdrawable));
      marginTradePositionAmounts.push(addComma(transition.marginTradePositionAmount));
      marginRates.push(`${modifiedMarginRate}%`);
      return 0;
    });
    result.push(
      collateralCashes,
      collaterals,
      marginTradePositionPLs,
      marginTradePositionExpenses,
      marginTradeUnsettledLosses,
      marginTradeUnsettledProfits,
      marginReceiveds,
      marginRequireds,
      cashMarginRequireds,
      withdrawables,
      marginTradePositionAmounts,
      marginRates
    );
    return result;
  }
};