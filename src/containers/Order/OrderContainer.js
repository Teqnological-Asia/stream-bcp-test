import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Order from '../../components/Order';
import {loadOrdersRequest} from '../../actions/order';
import {loadRequest} from "../../actions/order";

const mapStateToProps = (state) => {
  const { orders, currentPage, totalPages,load} = state.orderReducer;
  return {
    orders,
    currentPage,
    totalPages,
    load
  };
};


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadOrdersRequest : loadOrdersRequest,
    loadRequest : loadRequest
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
