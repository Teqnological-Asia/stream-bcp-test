import React, { Component } from 'react';
import { connect } from 'react-redux';
import MarginOrderComplete from '../../components/Margin/Order/Complete';
import { marginStockPositions } from '../../selectors/MarginSelector';

class MarginOrderCompleteContainer extends Component {
  render() {
    return (
      <MarginOrderComplete {...this.props}/>
    );
  }
}

const mapStateToProps = (state) => ({
  stockDetail: state.physicalReducer.stockDetail,
  buttonType: state.marginReducer.buttonType,
  marginOrderSendParams: state.marginReducer.marginOrderSendParams,
  marginPositions: marginStockPositions(state),
})

export default connect(
  mapStateToProps
)(MarginOrderCompleteContainer);