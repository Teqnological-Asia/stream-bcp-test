import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Order from '../../components/Order';
import {loadOrdersRequest, loadOrdersRequestUs} from '../../actions/order';
import {loadUsStocksRequest} from "../../actions/usStock";

const mapStateToProps = (state) => {
  const { orders, currentPage, totalPages} = state.orderReducer;
  const {usStocks} = state.usStockReducer
  return {
    orders,
    currentPage,
    totalPages,
    usStocks
  };
};


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadOrdersRequestUs : loadOrdersRequestUs,
    loadOrdersRequest : loadOrdersRequest,
    loadUsStocksRequest : loadUsStocksRequest
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
