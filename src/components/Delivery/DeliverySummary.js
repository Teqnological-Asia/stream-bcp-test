import React from 'react';
import { formatCurrency } from '../../utils';

const DeliverySummary = ({numberOfRow, numberOfStock, totalCommissionAmount}) => {
  return (
    <dl>
      <dt>合計返却件数</dt>
      <dd>{numberOfRow}件</dd>
      <dt>合計返却株数</dt>
      <dd>{numberOfStock}株</dd>
      <dt>合計手数料金額</dt>
      <dd>{formatCurrency(totalCommissionAmount)}円</dd>
    </dl>
  );
}

export default DeliverySummary;
