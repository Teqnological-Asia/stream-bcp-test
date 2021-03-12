import React from 'react';
import { formatDate, formatCurrency } from '../../../utils';

const FractionalSellSummary = ({numberOfRow, numberOfStock}) => {
  return (
    <table>
      <tbody>
        <tr>
          <th>受付日<br/><span className="u-11px">発注前日15:59まで受付</span></th>
          <td>
            {formatDate(new Date())}
          </td>
        </tr>
        <tr>
          <th>支払い方法</th>
          <td>約定日から起算して3営業日目にお預り金へ入金されます。</td>
        </tr>
        <tr>
          <th>合計注文件数</th>
          <td>{numberOfRow} 件</td>
        </tr>
        <tr>
          <th>合計株数</th>
          <td>{formatCurrency(numberOfStock)} 株</td>
        </tr>
        <tr>
          <th>合計手数料金額</th>
          <td>約定代金の1.1%（消費税込み）【2021年3月26日16:00以降、約定代金の1.1%（消費税込み）又は55円のいずれか大きい金額】</td>
        </tr>
      </tbody>
    </table>
  );
}

export default FractionalSellSummary;
