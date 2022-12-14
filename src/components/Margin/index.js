import React, { Component } from 'react';
import MarginTable from './MarginTable';

class Margin extends Component {
  render() {
    const { marginPositions } = this.props

    return (
      <div className="l-contents_body_inner">
        <div className="u-mt40p">
          <div className="p-section_header">
            <div className="p-section_header_title">信用建玉決済</div>
          </div>
        </div>
        {
          marginPositions.length > 0 ?
          <MarginTable {...this.props}/> :
          <div className="p-section_lead u-mt20p">
            <p className="p-no_item">明細はありません。</p>
          </div>
        }
      </div>
    )
  }
}

export default Margin;