import React from 'react';
import {Link} from 'react-router-dom';
import {formatTime, formatDate, formatCurrency} from '../../utils';
import {statuses, formatPrice, formatTradeType} from './common';


const OrderUsRow = ({order, loadUs}) => {
  const renderTradeType = (order) => {
    const className = order.side === 'sell' ? 'u-sell' : 'u-buy';

    return (
      <span className={className}>{formatTradeType(order, true)}</span>
    );
  }

  const renderStatusLink = (order) => {
    return (
      <Link className="c-u" to={`/account/order_us/${order.orderID}/detail`}>{statuses[order.status]}</Link>
    );
  }


  const executionTypes = {
    'none': '',
    'on_open': '寄付',
    'on_close': '引け',
    'funari': '不成'
  }

  const formatCondition = (order) => {
    if (order.order_condition_type === 'stop') {
      const suffix = order.stop_condition === 'upper' ? '以上' : '以下';
      return `${order.stop_price}円${suffix}`;
    } else {
      return executionTypes[order.execution_type];
    }
  }
  const formattedCondition = formatCondition(order);

  return (
    <tr>
      <td className="c-action">
        {order.isCancelable && (
          <Link className="icon-cancel-circled" to={`/account/order_us/${order.orderID}/cancel`}>
            <span>取り消す</span>
          </Link>
        )}
      </td>
      <td className="c-l" data-name="銘柄コード">{order.stockCode}</td>
      <td className="c-l" data-name={order.stockCode}>{loadUs.name}</td>
      <td className="c-l" data-name="区分">{renderTradeType(order)}</td>
      <td className="c-l" data-name="取引時間">
        {formatDate(order.orderTime)} <br/>
        {formatTime(order.orderTime)}
      </td>
      <td data-name="取引数量">{formatCurrency(order.quantity, 0)}</td>
      <td className="c-l"
          data-name="（出来済）">{order.filledQuantity != null ? formatCurrency(order.filledQuantity, 0) : 0}</td>
      <td className="c-l" data-name="取引状況">{renderStatusLink(order)}</td>
      <td className="c-l" data-name="取引条件">
        {formattedCondition}
        {formattedCondition !== '' && <br/>}
        {formatPrice(order)}
      </td>
      <td className="c-l" data-name="有効期限">当日中</td>
    </tr>
  );
}

export default OrderUsRow;
