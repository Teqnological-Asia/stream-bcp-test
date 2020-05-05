import React, { Component } from 'react';
import { connect } from 'react-redux';
import MarginDelivery from '../../components/Margin/Delivery';
import { bindActionCreators } from 'redux';
import { sendMarginSwap } from '../../actions/margin';

class MarginDeliveryContainer extends Component {
  render() {
    return (
      <MarginDelivery {...this.props}/>
    );
  }
}

const mapStateToProps = (state) => ({
  marginOrder: state.marginReducer.marginOrder,
  stockDetail: state.physicalReducer.stockDetail,
  buttonType: state.marginReducer.buttonType,
  marginPositions: state.marginReducer.marginPositions
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    sendMarginSwap
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MarginDeliveryContainer);