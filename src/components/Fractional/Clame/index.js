import React, { Component } from 'react';
import FractionalClameList from './FractionalClameList';
import FractionalClameSummary from './FractionalClameSummary';
import { removeElementFromArray } from '../../../utils';
import { Link } from 'react-router-dom';
import RejectModal from '../Sell/FractionalSellRejectModal';

class FractionalClame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfRow: 0,
      numberOfStock: 0,
      selectedStockCodes: [],
      totalCommissionAmount: 0,
      canSubmit: true,
      isOpen: false
    }
  }

  componentDidMount() {
    this.props.loadFractionalsRequest();
  }

  setRejectModal(isOpen) {
    this.setState({ isOpen: isOpen })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.buySellFractionalRequest(2, this.state.selectedStockCodes);
  }

  handleCheck = (stock_code, quantity, e) => {
    const target = e.target;

    if (stock_code.length === 5 && /9$/.test(stock_code)) { //WBCP-604
      e.preventDefault();
      e.stopPropagation();
      this.setRejectModal(true);
      return;
    }

    var newNumberOfRow = this.state.numberOfRow;
    var newNumberOfStock = this.state.numberOfStock;
    var selectedStockCodes = this.state.selectedStockCodes;

    if (target.checked) {
      newNumberOfRow = newNumberOfRow + 1;
      newNumberOfStock = newNumberOfStock + quantity;
      selectedStockCodes.push(stock_code);
    } else {
      newNumberOfRow = newNumberOfRow - 1;
      newNumberOfStock = newNumberOfStock - quantity;
      removeElementFromArray(selectedStockCodes, stock_code);
    }

    var newCanSubmit = (newNumberOfRow > 0) ? false : true;
    var totalCommissionAmount = newNumberOfRow * 550;

    this.setState({
      numberOfRow: newNumberOfRow,
      numberOfStock: newNumberOfStock,
      selectedStockCodes: selectedStockCodes,
      totalCommissionAmount: totalCommissionAmount,
      canSubmit: newCanSubmit
    });
  }

  render() {
    const { isOpen, selectedStockCodes } = this.state;

    return (
      <div className="l-contents_body_inner">
        <div className="u-mt40p">
          <div className="p-section_header">
            <div className="p-section_header_title">単元未満株式 <b>買取請求</b></div>
            <div className="p-section_header_tools">
              <ul>
                <li>
                  <Link to="/account/fractional/sell">
                    <i className="icon-right-open"></i>売却サービスはこちら
                  </Link>
                </li>
                <li>
                  <Link to="/account/fractional/cancel">
                    <i className="icon-info-circled"></i>予約確認はこちら（当日のみ)
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="u-mt20p">
          <FractionalClameList
            fractionals={this.props.fractionals}
            selectedStockCodes={selectedStockCodes}
            handleCheck={this.handleCheck}
          />
          <RejectModal isOpen={isOpen} handleClose={() => this.setRejectModal(false)}/>
        </div>
        <div className="u-mt20p">
          <div className="p-section_lead">
            <p>※一注文につき、550円（税込み）の手数料がかかります。預り金残高が不足している場合、承れませんのでご注意願います。</p>
            <p>※特定口座の計算対象外となります。ご注意ください。</p>
            <p>※約定は当社から株主名簿管理人（信託銀行など）に買取請求を行った日の終値で買取られます。受付日と異なりますのでご注意願います。売買が成立しない場合は約定が遅れることがあります。</p>
            <p>
            ※当社手数料とは別に、銘柄により買取手数料が売却代金より差し引かれる場合がございます。この買取手数料は発行会社の株式取扱規則に規定されているもので、銘柄ごとに手数料が異なっています。詳細につきましては、各銘柄の株主名簿管理人（信託銀行等）へお問合せください。
            </p>
            <p>※直近で手続きを行った銘柄は明細に表示されない場合があります（概ね5営業日）。銘柄が表示されない場合にはカスタマーサポートセンターまでお問い合わせください。</p>
          </div>
        </div>
        <div className="u-mt20p">
          <div className="c-table_inputs">
            <FractionalClameSummary numberOfRow={this.state.numberOfRow}
              numberOfStock={this.state.numberOfStock}
              totalCommissionAmount={this.state.totalCommissionAmount} />
          </div>
        </div>
        <div className="u-mt20p">
          <button className="c-button" onClick={this.handleSubmit} disabled={this.state.canSubmit}>買取請求申込みする</button>
        </div>
      </div>
    )
  };
}

export default FractionalClame;
