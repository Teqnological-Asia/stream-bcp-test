import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UsStockSell from '../../components/UsStock/Sell'
import { loadStockDetailRequest, getUsStockBalances, saveOrderFormRequest, getPriceInfo } from '../../actions/usStock';

const mapStateToProps = (state) => {
  const { stockDetail, physicalDetail, orderFormValues, orderPrice } = state.usStockReducer;
  return {
    stockDetail,
    physicalDetail,
    orderFormValues,
    orderPrice
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadStockDetailRequest,
    getUsStockBalances,
    saveOrderFormRequest,
    getPriceInfo,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UsStockSell);