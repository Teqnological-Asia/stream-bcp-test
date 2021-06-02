import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UsStock from '../../components/UsStock';
import { loadUsStockBalancesRequest, loadUsStocksRequest } from "../../actions/usStock";
import Order from "../../components/Order";
import OrderCancel from "../../components/Order/Cancel";


const mapStateToProps = (state) => ({
  usStockBalances: state.usStockReducer.usStockBalances,
  usStocks: state.usStockReducer.usStocks
})


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadUsStockBalancesRequest: loadUsStockBalancesRequest,
    loadUsStocksRequest: loadUsStocksRequest,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsStock);
