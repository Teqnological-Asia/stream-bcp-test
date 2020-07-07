import React, { Component } from 'react';
import { connect } from 'react-redux';
import MarginDeliveryComplete from '../../components/Margin/Delivery/Complete';
import { marginStockPositions } from '../../selectors/MarginSelector';

class MarginDeliveryCompleteContainer extends Component {
  render() {
    return (
      <MarginDeliveryComplete {...this.props}/>
    );
  }
}
const mapStateToProps = (state) => ({
  marginOrder: state.marginReducer.marginOrder,
  stockDetail: state.physicalReducer.stockDetail,
  buttonType: state.marginReducer.buttonType,
  marginPositions: marginStockPositions(state),
})

export default connect(
  mapStateToProps
)(MarginDeliveryCompleteContainer);