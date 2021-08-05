import React, { Component } from "react";
import { formatDateTime } from "../../utils";
import UsStockList from "./UsStockList";

class UsStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curDateTime: new Date(),
    };
  }

  componentDidMount() {
    this.props.loadUsStockBalancesRequest();
    this.props.loadUsStocksRequest();
  }

  reloadData = () => {
    this.props.loadUsStockBalancesRequest();
    this.props.loadUsStocksRequest();
    this.setState({ curDateTime: new Date() });
  };

  render() {
    return (
      <div className="l-contents_body_inner">
        <div className="u-mt40p">
          <div className="p-section_header">
            <div className="p-section_header_title">
              米国株式 <b>売却</b>
            </div>
            <div className="p-section_header_aside">
              <span> {formatDateTime(this.state.curDateTime)} </span>(
              <a className="icon-arrows-ccw cursor" onClick={this.reloadData}>
                更新
              </a>
              ）
            </div>
          </div>
        </div>
        <UsStockList usStockBalances={this.props.usStockBalances.items}  usStocks={this.props.usStocks.items}/>
      </div>
    );
  }
}

export default UsStock;
