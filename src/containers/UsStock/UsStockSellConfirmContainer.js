import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UsStockSellConfirm from '../../components/UsStock/Sell/Confirm/index'
import { createOrderRequest } from '../../actions/usStock';

const mapStateToProps = (state) => {
  const { stockDetail, orderSendParams, orderFormValues } = state.usStockReducer;

  return {
    stockDetail,
    orderSendParams,
    orderFormValues
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    createOrderRequest
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UsStockSellConfirm);