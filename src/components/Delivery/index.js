import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import DeliveryList from './DeliveryList';
import DeliverySummary from './DeliverySummary';
import DeliveryForm from './DeliveryForm';
import {
  removeElementFromArray,
  validateNumber
} from '../../utils';

class Delivery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfRow: 0,
      numberOfStock: 0,
      selectedStockCodes: [],
      totalCommissionAmount: 0,
      canNotSubmit: true,
      jasdec_code_7: '',
      jasdec_code_14: '',
      company_name: '',
      branch_name: '',
      branch_address: '',
      branch_code: '',
      account_id: '',
      isASelected: "p-labelblock is-selected",
      isBSelected: "p-labelblock",
      isDateEnable: "p-form-object_calender is_disbale",
      isDateControlDisable: false,
      request_date: ''
    }
  }

  componentDidMount() {
    this.props.loadDeliveriesIndexRequest();
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const params = {
      request_date: this.state.request_date,
      stock_codes: this.state.selectedStockCodes,
      jasdec_code: this.state.jasdec_code_7 + this.state.jasdec_code_14,
      company_name: this.state.company_name,
      branch_name: this.state.branch_name,
      branch_address: this.state.branch_address,
      branch_code: this.state.branch_code,
      account_id: this.state.account_id
    };

    this.props.submitdeliveriesRequest(params);
  }

  handleCheck = (stock_code, quantity, e) => {
    const target = e.target;

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

    var totalCommissionAmount = newNumberOfRow * 1100;
    var newCannotSubmit = false;

    if (newNumberOfRow === 0) {
      newCannotSubmit = true;
    }

    if (this.state.jasdec_code_7 === '') {
      newCannotSubmit = true;
    }

    if (this.state.jasdec_code_14 === '') {
      newCannotSubmit = true;
    }

    if (this.state.request_date === '' && this.state.isBSelected === "p-labelblock is-selected") {
      newCannotSubmit = true;
    }

    if (this.state.company_name === '') {
      newCannotSubmit = true;
    }

    if (this.state.branch_name === '') {
      newCannotSubmit = true;
    }

    if (this.state.branch_address === '') {
      newCannotSubmit = true;
    }

    if (this.state.branch_code === '') {
      newCannotSubmit = true;
    }

    if (!validateNumber(this.state.account_id)) {
      newCannotSubmit = true;
    }

    this.setState({
      numberOfRow: newNumberOfRow,
      numberOfStock: newNumberOfStock,
      selectedStockCodes: selectedStockCodes,
      totalCommissionAmount: totalCommissionAmount,
      canNotSubmit: newCannotSubmit
    });
  }

  validateAccountId = (e) => {
    if (e.charCode >= 48 && e.charCode <= 57) {
      return true;
    } else {
      e.preventDefault();
    }
  }

  handleUserInput = (e) => {
    const target = e.target;

    if (target === undefined) {
      var newCannotSubmit = false;

      if (this.state.numberOfRow === 0) {
        newCannotSubmit = true;
      }

      if (this.state.jasdec_code_7 === '') {
        newCannotSubmit = true;
      }

      if (this.state.jasdec_code_14 === '') {
        newCannotSubmit = true;
      }

      if (this.state.company_name === '') {
        newCannotSubmit = true;
      }

      if (this.state.branch_name === '') {
        newCannotSubmit = true;
      }

      if (this.state.branch_address === '') {
        newCannotSubmit = true;
      }

      if (this.state.branch_code === '') {
        newCannotSubmit = true;
      }

      if (!validateNumber(this.state.account_id)) {
        newCannotSubmit = true;
      }

      if (e[0] === undefined) {
        newCannotSubmit = true;
      }

      this.setState({
        request_date: moment(e[0]).format('YYYYMMDD'),
        canNotSubmit: newCannotSubmit
      });
    } else if (target.type === "radio") {
      var isDateEnable = "";
      var isASelected = "";
      var isBSelected = "";
      var isDateControlDisable = true;

      if (target.value === "ptn_B") {
        isDateEnable = "p-form-object_calender";
        isDateControlDisable = false;
        isASelected = "p-labelblock";
        isBSelected = "p-labelblock is-selected";
      } else{
        isDateEnable = "p-form-object_calender is_disbale";
        isDateControlDisable = true;
        isASelected = "p-labelblock is-selected";
        isBSelected = "p-labelblock";
      }

      newCannotSubmit = false;

      if (this.state.request_date === '' && isBSelected === "p-labelblock is-selected") {
        newCannotSubmit = true;
      }

      if (this.state.numberOfRow === 0) {
        newCannotSubmit = true;
      }

      if (this.state.jasdec_code_7 === '') {
        newCannotSubmit = true;
      }

      if (this.state.jasdec_code_14 === '') {
        newCannotSubmit = true;
      }

      if (this.state.company_name === '') {
        newCannotSubmit = true;
      }

      if (this.state.branch_name === '') {
        newCannotSubmit = true;
      }

      if (this.state.branch_address === '') {
        newCannotSubmit = true;
      }

      if (this.state.branch_code === '') {
        newCannotSubmit = true;
      }

      if (!validateNumber(this.state.account_id)) {
        newCannotSubmit = true;
      }

      this.setState({
        isDateEnable: isDateEnable,
        isDateControlDisable: isDateControlDisable,
        isASelected: isASelected,
        isBSelected: isBSelected,
        canNotSubmit: newCannotSubmit
      });

    } else {
      newCannotSubmit = false;

      if (this.state.numberOfRow === 0) {
        newCannotSubmit = true;
      }

      if (this.state.jasdec_code_7 === '') {
        newCannotSubmit = true;
      }

      if (this.state.jasdec_code_14 === '') {
        newCannotSubmit = true;
      }

      if (this.state.company_name === '') {
        newCannotSubmit = true;
      }

      if (this.state.branch_name === '') {
        newCannotSubmit = true;
      }

      if (this.state.branch_address === '') {
        newCannotSubmit = true;
      }

      if (this.state.branch_code === '') {
        newCannotSubmit = true;
      }

      if (!validateNumber(this.state.account_id)) {
        newCannotSubmit = true;
      }

      const name = target.name
      const value = target.value;

      if (value === '') {
        newCannotSubmit = true;
      }

      this.setState({[name]: value, canNotSubmit: newCannotSubmit});
    }

  }

  render() {
    return (
      <div className="l-contents_body_inner">
        <div className="u-mt40p">
          <div className="p-section_header">
            <div className="p-section_header_title">株式出庫 <b>口座出庫依頼書</b></div>
            <div className="p-section_header_tools">
              <ul>
                <li>
                  <Link to="/account/delivery/cancel">
                  <i className="icon-info-circled"></i>株式出庫依頼の確認へ（当日のみ）
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="u-mt20p">
          <div className="delivery-caption">口座振替申請書（一般）　兼　特定口座内保管上場株式等移管依頼書</div>
          <div className="delivery-description">租税特別措置法施行令第25条の10の２第11項の規定に基づき、下記に示す振替元の特定口座に係る特定口座内保管上場株式等を株式等振替制度による口座振替により、振替先の特定口座に振替することを依頼いたします。</div>
          <DeliveryForm handleUserInput={this.handleUserInput} validateAccountId= {this.validateAccountId} isDateEnable={this.state.isDateEnable} isDateControlDisable={this.state.isDateControlDisable} isASelected={this.state.isASelected} isBSelected={this.state.isBSelected} />
        </div>
        <div className="u-mt20p">
          <DeliveryList deliveries={this.props.deliveries} handleCheck={this.handleCheck} />
        </div>
        <div className="p-section_total u-mt20p">
          <DeliverySummary
            numberOfRow={this.state.numberOfRow}
            numberOfStock={this.state.numberOfStock}
            totalCommissionAmount={this.state.totalCommissionAmount}
          />
        </div>
        <div className="p-section_lead u-mt40p">
          <p>※移管1銘柄につき、1,100円（消費税込み）の手数料をいただきます。</p>
          <p>※ご注文中、または受渡日を迎えていない銘柄は、手続きを行なうことはできません。</p>
          <p>※特定口座株式の場合、お預かりの全株式数を移管いただきます。一部株式数の移管はできません。主口座・副口座に同じ銘柄のお預かりがある場合は、合算した全株式数を移管いたします。</p>
          <p>※移管先証券会社の都合で他社移管できない場合があります。（保管振替機構への加入者情報登録が行われていない場合など）</p>
          <p>※権利確定のための基準日が設定された場合、権利付最終日の15時より、移管手続を承ることができません。</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;ただし、決算期によっては、移管手続停止期間が、基準日の1週間前より行われる場合があります。</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;月の下旬に係る移管手続は承れない場合がありますのでご注意ください</p>
          <p>※直近で手続きを行った銘柄は明細に表示されない場合があります（概ね5営業日）。銘柄が表示されない場合にはカスタマーサポートセンターまでお問い合わせください。</p>
        </div>
        <div className="p-section_lead u-mt20p">
          <p><b>公開買付実施銘柄の他社移管についてのご注意事項</b></p>
          <p>※当社にて公開買付のための他社移管であると判断した場合、移管手数料をいただきません。</p>
          <p>※公開買付期間最終日を含め5営業日遡った日の24時までにご依頼ください。4営業日以降は、通常の他社移管手続として取り扱います。</p>
        </div>
        <div className="u-mt20p u-center">
          <button className="c-button" onClick={this.handleSubmit} disabled={this.state.canNotSubmit}>出庫依頼する</button>
        </div>
      </div>
    );
  }
}

export default Delivery;
