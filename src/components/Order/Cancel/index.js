import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import OrderDetailInfo from './OrderDetailInfo';
import OrderUsDetaiInfo from "./OrderUsDetaiInfo";

class OrderCancel extends Component {
  constructor(props) {
    super(props);
    this.orderId = this.props.match.params.id;
    this.country = this.props.match.params.order_us;
  }

  componentDidMount() {
    this.props.loadOrderUsDetailRequest(this.orderId);
    this.props.orderCancelUs(this.orderId)
    this.props.loadUsStocksRequest()
  }

  handleCancel = () => {

    const tradeType = this.props.order.trade_type
    this.country === "order_us" ? this.props.orderCancelUsRequest(this.orderId, this.props.request) :
      this.props.cancelOrderRequest(this.orderId, tradeType)
  }

  render() {
    const showOrder = (this.country === "order_us" ? <OrderUsDetaiInfo order={this.props.order} usStocks={this.props.usStocks.items}></OrderUsDetaiInfo>
  :<OrderDetailInfo order={this.props.order}></OrderDetailInfo>)

    return (
      <div className="l-contents_body_inner">
        <div className="u-mt40p">
          <div className="p-section_header">
            <div className="p-section_header_title">注文 <b>取消確認</b></div>
          </div>
        </div>
        <div className="u-mt20p">
          <div className="p-section_lead">
            <p>以下のご注文をご確認の上、「取り消しする」を押してください。</p>
          </div>
        </div>
        <div className="u-mt20p">
          <div className="c-table-responsive">
            {showOrder}
          </div>
        </div>
        <div className="u-mt20p">
          <Link className="c-button c-button_cancel" to="/account/order">戻る</Link>
          <a className="c-button c-button_delete" onClick={this.handleCancel}>取り消しする</a>
        </div>
      </div>
    )
  }
}

export default OrderCancel;
