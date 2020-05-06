import moment from "moment";

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
      collateralCashes.push(transition.collateralCash);
      collaterals.push("TODO");//calculate
      marginTradePositionPLs.push(transition.marginTradePositionPL);
      marginTradePositionExpenses.push(transition.marginTradePositionExpense);
      marginTradeUnsettledLosses.push(transition.marginTradeUnsettledLoss);
      marginTradeUnsettledProfits.push(transition.marginTradeUnsettledProfit);
      marginReceiveds.push(transition.marginReceived);
      marginRequireds.push(transition.marginRequired);
      cashMarginRequireds.push(transition.cashMarginRequired);
      withdrawables.push(transition.withdrawable);
      marginTradePositionAmounts.push(transition.marginTradePositionAmount);
      marginRates.push("TODO");//calculate
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