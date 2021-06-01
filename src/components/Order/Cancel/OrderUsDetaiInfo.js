import React from 'react';
import {formatTradeType} from '../common';

const OrderDetailInfo = ({order, load}) => {


  if (!order) {
    return null
  } else {
    const loadName = load.find((loadName) => loadName.code === order.stockCode
    )
    let nameUser = ''

    if (loadName != null) {
      nameUser = loadName.name
    }

    return (
      <table className="c-table_d c-table_confirm">
        <tbody>
        <tr>
          <th>銘柄コード</th>
          <td>{order.stockCode}/{nameUser}</td>
        </tr>
        {/* <tr>
          <th>市場</th>
          <td>当社最良執行市場</td>
        </tr> */}
        <tr>
          <th>取引</th>
          <td>{formatTradeType(order, true)}</td>
        </tr>
        <tr>
          <th>取引株数</th>
          <td>{order.quantity}株</td>
        </tr>
        <tr>
          <th>執行条件・単価</th>
          <td>相対</td>
        </tr>
        <tr>
          <th>取引期限</th>
          <td>当日中</td>
        </tr>
        </tbody>
      </table>
    )
  }


}

export default OrderDetailInfo;
