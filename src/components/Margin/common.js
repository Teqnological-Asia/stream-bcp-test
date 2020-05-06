import React from 'react'
import { formatCurrency } from '../../utils'
import { BUTTON_TYPE } from '../../constants/margin'

export const accountType = position => (
  position.account_type === 'specific' ? '特定' : '一般'
);

export const renderLossValuation = position => {
  if (position.profit == null) return '-';

  const result = Number(position.profit).toFixed(2);

  if (position.profit >= 0) {
    return `${formatCurrency(result, 0)}`;
  } else {
    return <span className="u-minus">{formatCurrency(result, 0)}</span>;
  }
};

export const name = position => {
  const stockName = position.stock_name
  const side = position.side === 'buy' ? '買建' : '売建'
  const marginTradeType = position.margin_trade_type === 'system' ? '制度' : '一般'
  return `${stockName}/${side}/${marginTradeType}`
};

export const quantity = position => {
  const orderingQuantity = position.ordering_quantity !== '0' ? `/ (${formatCurrency(position.ordering_quantity, 0)})` : ''
  return formatCurrency(position.quantity, 0).toString() + orderingQuantity
}

export const transactionByButtonType = (buttonType, tradeType) => {
  const { ORDER_BUY, ORDER_SELL, SWAP_BUY, SWAP_SELL } = BUTTON_TYPE
  var transaction = ''
  switch (buttonType) {
    case ORDER_BUY:
      transaction = '信用返済売'; break
    case ORDER_SELL:
      transaction = '信用返済買'; break
    case SWAP_BUY:
      transaction = '現引'; break
    case SWAP_SELL:
      transaction = '現渡'; break
    default: null; break
  }
  if(!tradeType) return transaction
  const transactionWithTradeType = tradeType === 'system' ? `${transaction}制度` : `${transaction}一般`
  return transactionWithTradeType
}

export const entryPrice = (position) => {
  if(position.side === 'buy') {
    const roundUp = Number(position.entry_price).toFixed(0)
    return formatCurrency(roundUp, 0)
  } else {
    return formatCurrency(position.entry_price, 0)
  }
}
