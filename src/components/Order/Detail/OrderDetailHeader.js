import React from 'react';
import { statuses, formatTradeType, formatPrice, formatExpirationDate } from '../common';
import { formatDateTime, formatCurrency } from '../../../utils';

const OrderDetailHeader = ({order}) => {
  if (!order) return null;

  const renderTradeType = (order) => {
    const className = order.side === 'sell' ? 'u-sell' : 'u-buy';

    return (
      <span className={className}>{formatTradeType(order)}</span>
    );
  }

  return (
    <div className="p-section_info">
      <div className="p-section_info_head">
        <div className="p-section_info_number">({order.stock_code})</div>
        <div className="p-section_info_title">{order.stock_name}</div>
        <div className="p-section_info_date">
          <div className="p-section_info_attr">発注時間:</div>
          <div className="p-section_info_value">
            {formatDateTime(order.order_time)}
          </div>
          <div className="p-section_info_attr">有効期限:</div>
          <div className="p-section_info_value">
            {formatExpirationDate(order)}
          </div>
        </div>
      </div>
      <div className="p-section_info_body">
        <div className="p-section_info_section">
          <div className="p-section_info_attr">区分</div>
          <div className="p-section_info_value">
            {renderTradeType(order)}
           </div>
        </div>
        <div className="p-section_info_val">
          <div className="p-section_info_attr">取引数量</div>
          <div className="p-section_info_value en">
            <span className="num">{formatCurrency(order.order_quantity, 0)}</span>
          </div>
        </div>
        <div className="p-section_info_val_done">
          <div className="p-section_info_attr">出来済</div>
          <div className="p-section_info_value en">
            <span className="num">{formatCurrency(order.filled_quantity, 0)}</span>
          </div>
        </div>
        <div className="p-section_info_status">
          <div className="p-section_info_attr">取引状況</div>
          <div className="p-section_info_value">
            {statuses[order.order_status]}
          </div>
        </div>
        <div className="p-section_info_condition">
          <div className="p-section_info_attr">取引条件</div>
          <div className="p-section_info_value">
            {formatPrice(order)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailHeader;