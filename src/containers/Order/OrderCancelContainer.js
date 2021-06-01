import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import OrderCancel from '../../components/Order/Cancel';
import {loadOrderDetailRequest} from '../../actions/orderDetail';
import {cancelOrderRequest, loadRequest, orderCancelUs, orderCancelUsRequest} from '../../actions/order';


const mapStateToProps = (state) => {
  return {
    order: state.orderDetailReducer.order,
    load: state.orderReducer.load,
    request: state.orderReducer.request
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadRequest,
    loadOrderDetailRequest,
    cancelOrderRequest,
    orderCancelUsRequest,
    orderCancelUs
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderCancel);
