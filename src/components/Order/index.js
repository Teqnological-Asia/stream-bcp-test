import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Pagination from '../Authenticated/Pagination';
import OrderUsList from './OrderUsList';
import OrderList from "./OrderList";
import {formatDateTime} from '../../utils';

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 1,
      curDateTime: new Date(),
    };
  }

  getChildContext() {
    const {currentPage, totalPages} = this.props;
    return {currentPage, totalPages};
  }

  componentDidMount() {
    this.loadOrders(1, 1);

    // Call only 1 times instead of everytime change page
    this.props.loadUsStocksRequest()
  }

  loadOrders = (page = 1, tab) => {
    if (tab !== this.state.tab) { //Reset orders state first when change tab
      this.props.loadOrdersSuccess([], null, null)
    }
    let params = {page: page, size: 10};
    tab === 1 ? this.props.loadOrdersRequest(params) : this.props.loadOrdersRequestUs(params)
  }

  handlePageChange = page => {
    const tab = this.state.tab;
    this.loadOrders(page, tab);
  }

  reloadData = () => {
    const tab = this.state.tab
    this.loadOrders(1, tab);
    this.setState({curDateTime: new Date()});
  }
  selectTab = (tab) => {
    this.loadOrders(1, tab)
    this.setState({
      tab: tab
    })
  }

  render() {
    const {orders, currentPage, totalPages, usStocks} = this.props;
    const {tab} = this.state
    const showPagination = orders.length > 0;
    console.log(orders)
    const country = tab === 1 ? <OrderList orders={orders}/> :
      <OrderUsList orders={orders} usStocks={usStocks.items}/>
    const pagination = (
      showPagination &&
      <Pagination
        boundaryPagesRange={0}
        siblingPagesRange={2}
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={this.handlePageChange}
      />
    )

    return (
      <div className="l-contents_body_inner">
        <div className="u-mt40p">
          <div className="p-section_header">
            <div className="p-section_header_title">注文 <b>照会</b></div>
            <div className="p-section_header_aside">
              <span> {formatDateTime(this.state.curDateTime)} </span>
              (<a className="icon-arrows-ccw cursor" onClick={this.reloadData}>更新</a>）
            </div>
          </div>
        </div>
        <div className="p-nav_sub">
          <ul>
            <li className={`custom ${tab === 1 ? 'is_current_custom' : ''}`}>
              <a onClick={() => this.selectTab(1)}>国内株式</a>
            </li>
            <li className={`custom ${tab === 2 ? 'is_current_custom' : ''}`}>
              <a onClick={() => this.selectTab(2)}>米株株式</a>
            </li>
          </ul>
        </div>
        <div className="u-mt20p">
          {country}
          {pagination}
        </div>
        <div className="u-mt40p">
          <div className="p-section_lead">
            <p>※当緊急時取引メニューは、現物株式の売却および信用建玉の返済の受付のみに限定させていただいております。上記「注文照会」に「現物買」
              「信用新規」注文が表示されている場合がありますが、「取消」をされた場合、再度発注することはできませんので、あらかじめご了承願います。</p>
            <p>※注文の訂正はできません。訂正する場合には一旦注文の取消後、再度注文（現物株式の売却、信用取引の決済）を発注ください。</p>
          </div>
        </div>
      </div>
    )
  }
}

Order.childContextTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number
}

export default Order;
