import React from "react";
import EmptyTableRow from "../Authenticated/EmptyTableRow";
import UsStockRow from "./UsStockRow";

const UsStockList = ({ usStockBalances, usStocks }) => {
  const renderUsStocks = (usStockBalances) => {
    if (usStockBalances && usStocks && usStockBalances.length > 0) {
      return usStockBalances.map((usStockBalance, key) => {
        const usStock = usStocks.find((usStock)=> usStock.code === usStockBalance.stockCode)
        return (
        <UsStockRow {...{ usStockBalance, key, usStock }} />
      )});
    } else {
      return <EmptyTableRow message="明細はありません。" />;
    }
  };
  return (
    <div className="u-mt20p">
      <table className="c-table_list">
        <thead>
          <tr>
            <th className="c-l">銘柄コード</th>
            <th className="c-l">銘柄</th>
            <th className="c-l">区分</th>
            <th>数量/（取引中）</th>
            <th>参考取得単価</th>
            <th>時価評価額</th>
            <th>評価損益</th>
            <th className="c-c">発注</th>
          </tr>
        </thead>
        <tbody>{renderUsStocks(usStockBalances)}</tbody>
      </table>
    </div>
  );
};

export default UsStockList;
