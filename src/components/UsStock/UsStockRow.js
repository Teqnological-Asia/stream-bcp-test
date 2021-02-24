import React from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils";
import { accountTypes } from "../Physical/PhysicalRow"

const UsStockRow = ({ usStockBalance, usStock }) => {
  const formattedQuantities = (usStockBalance) => {
    if (usStockBalance.orderedQuantity == null || usStockBalance.balanceQuantity == null) {
      return "-";
    }

    return usStockBalance.balanceQuantity > 0
      ? `${formatCurrency(usStockBalance.balanceQuantity, 0)} (${formatCurrency(
          usStockBalance.orderedQuantity,
          0
        )})`
      : formatCurrency(usStockBalance.balanceQuantity);
  };
  const renderSellButton = (
    <Link
      className="c-button c-button_small c-button_sell"
      to={`/account/us-stock/${usStockBalance.stockCode}/order`}
    >
      売却
    </Link>
  );

  return (
    <tr>
      <td className="c-l c-code">
        {usStockBalance.stockCode}
      </td>
      <td className="c-l c-title" data-name={usStockBalance.stockCode}>
        {usStock.name}
      </td>
      <td className="c-l" data-name="区分">
        {accountTypes[usStockBalance.accountType]}
      </td>
      <td data-name="数量/（取引中）">
        {formattedQuantities(usStockBalance)}
      </td>
      <td data-name="取得単価">
        {formatCurrency(Number(usStockBalance.bookPrice).toFixed(0))}円
      </td>
      <td data-name="時価評価額">
        {formatCurrency(Number(usStockBalance.wb4CurrentValue).toFixed(0))}円
      </td>
      <td data-name="評価損益">
        {formatCurrency(Number(usStockBalance.wb4CurrentProfit).toFixed(0))}円
      </td>
      <td className="c-c">{renderSellButton}</td>
    </tr>
  );
};

export default UsStockRow;
