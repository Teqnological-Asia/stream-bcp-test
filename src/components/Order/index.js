import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pagination from '../Authenticated/Pagination';
import OrderList from './OrderList';
import { formatDateTime } from '../../utils';

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curDateTime: new Date(),
      filter: 'working'
    };
  }

  getChildContext() {
    const { currentPage, totalPages } = this.props;
    return { currentPage, totalPages };
  }

  componentDidMount() {
    this.loadOrders(1, 'working');
  }

  loadOrders = (page = 1, filter) => {
    let params = { page: page };
    this.props.loadOrdersRequest(params, filter);
  }
  filterOrders = (filter) => {
    this.loadOrders(1, filter)
    this.setState({
      filter: filter
    })
  }
  handlePageChange = page => {
    const filter = this.state.filter
    this.loadOrders(page, filter);
  }

  reloadData = () => {
    const filter = this.state.filter
    this.loadOrders(1, filter);
    this.setState({ curDateTime: new Date() });
  }
  render() {
    const { orders, currentPage, totalPages } = this.props;
    const {filter} = this.state
    const showPagination = orders.length > 0;
    const pagination = (
      showPagination &&
      <Pagination
        boundaryPagesRange={0}
        siblingPagesRange={2}
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={this.handlePageChange}
      />
    );

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
            <li className={`custom ${filter?'is_current_custom': ''}`}>
              <a  onClick={() => this.filterOrders('working')}>未約定注文</a>
            </li>
            <li className={`custom ${filter?'': 'is_current_custom'}`}>
              <a  onClick={() => this.filterOrders('')}>全注文表示</a>
            </li>
          </ul>
        </div>

        <div className="u-mt20p">
          <OrderList orders={orders} />
          {pagination}
        </div>

        <div className="u-mt40p">
          <div className="p-section_lead">
            <p>※当緊急時取引メニューは、現物株式の売却および信用建玉の返済の受付のみに限定させていただいております。上記「注文照会」に「現物買」 「信用新規」注文が表示されている場合がありますが、「取消」をされた場合、再度発注することはできませんので、あらかじめご了承願います。</p>
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