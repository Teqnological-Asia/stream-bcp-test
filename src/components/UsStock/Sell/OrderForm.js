import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency, validateIntegerNumber, validateNumber } from '../../../utils';
import moment from 'moment';


class OrderForm extends Component {
  constructor(props) {
    super(props);

    const { quantity, orderType, price } = props.orderFormValues || {};

    this.state = {
      quantity: quantity || '',
      orderType: orderType || 'Market',
      price: price || ''
    }

    this.validateNumberError = '数値を入力してください';
  }

  handleTextChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({[name]: value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { quantity, orderType, price } = this.state;

    if (!quantity || !validateIntegerNumber(quantity)) {
      alert(this.validateNumberError);
      return;
    }

    if (orderType === 'Limit' && (!price || !validateNumber(price))) {
      alert(this.validateNumberError);
      return;
    }


    this.props.saveOrderFormRequest(this.props.stockCode, this.state);
  }

  setShortableQuantity = () => {
    this.setState({quantity: this.getDefaultQuantity(this.props.physicalDetail)});
  }

  getDefaultQuantity = (physicalDetail) => {
    if (physicalDetail === null) return '';

    const tradeUnit = parseInt(physicalDetail.trade_unit, 10);
    const shortableQuantity = parseInt(physicalDetail.shortable_quantity, 10);
    return Math.floor(shortableQuantity / tradeUnit) * tradeUnit;
  }

  handleChangeQuantity = (e, type) => {
    e.preventDefault();
    const quantity = this.state.quantity;
    // default 1
    const tradeUnit = 1
    // const defaultQuantity = this.getDefaultQuantity(physicalDetail);

    if (quantity === '') {
      this.setState({quantity: tradeUnit});
      return;
    }

    if (!validateIntegerNumber(quantity)) {
      alert(this.validateNumberError);
      return;
    }

    let parsedQuantity = parseInt(quantity, 10);

    if (parsedQuantity < tradeUnit) {
      this.setState({quantity: tradeUnit});
      return;
    }

    // if (parsedQuantity > defaultQuantity) {
    //   this.setState({quantity: defaultQuantity});
    //   return;
    // }

    if (type === 'up') {
      parsedQuantity = parsedQuantity + tradeUnit;
      // if (parsedQuantity > defaultQuantity) {
      //   parsedQuantity = defaultQuantity;
      // }
    } else {
      parsedQuantity = parsedQuantity - tradeUnit;
      if (parsedQuantity < tradeUnit) {
        parsedQuantity = tradeUnit;
      }
    }

    this.setState({quantity: parsedQuantity});
  }

  validateMaxNumChar = (e) => {
    if (this.state.quantity.length + 1 > 9) {
      e.preventDefault();
    }

    if (this.state.price.length + 1 > 9) {
      e.preventDefault();
    }
  }

  formattedQuantities = physical => (
    physical && physical.shortableQuantity ? formatCurrency(physical.shortableQuantity) : '-'
  )

  formattedTransactionPrice = price => (
    price && price[0] && price[0].estimatePrice ? formatCurrency(price[0].estimatePrice.bid,0) : '-'
  )

  formattedUpdateTime = time => (
    time && time[0] && time[0].exchangeRate ? moment(time[0].exchangeRate.updateAt ).format('MM/DD hh:mm ') : '-'
  )

  formattedExchangeRate = rate => (
    rate && rate[0] && rate[0].exchangeRate ? formatCurrency(rate[0].exchangeRate.bid,2) : '-'
  )

  formattedCommission = rate => (
    rate && rate[0] && rate[0].exchangeRate ? formatCurrency((rate[0].exchangeRate.ask - rate[0].exchangeRate.bid)/2,2) : '-'
  )

  render() {
    const { stockDetail, physicalDetail, orderPrice } = this.props;
    const { quantity, orderType, price } = this.state;
    if (stockDetail === null || physicalDetail === null) return null;

    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <div className="u-mt20p">
          <div className="c-table-responsive">
            <div className="c-table_inputs">
              <table>
                <tbody>
                  <tr>
                    <th>銘柄コード</th>
                    <td>{stockDetail.code}/{stockDetail.name}</td>
                  </tr>
                  <tr>
                    <th>取引</th>
                    <td>現物売却</td>
                  </tr>
                  <tr>
                    <th>取引株数</th>
                    <td>
                      <div className="u-row">
                        <div className="u-col_50 u-col_100_sp">
                          <div className="p-input_updown">
                            <div className="p-input">
                              <input name="quantity" className="u-right" type="text" placeholder="数値を入力してください" onChange={this.handleTextChange} value={quantity} onKeyPress={this.validateMaxNumChar} />
                            </div><span className="p-unit">株</span>
                            <button className="p-input_control p-input_up" onClick={(e) => this.handleChangeQuantity(e, 'up')}>UP</button>
                            <hr/>
                            <button className="p-input_control p-input_down" onClick={(e) => this.handleChangeQuantity(e, 'down')}>DOWN</button>
                          </div>
                        </div>
                        <div className="u-col_50 u-col_100_sp u-mt10p_sp">
                          <p style={{fontSize: '12px'}}>売却可能数量　{this.formattedQuantities(physicalDetail)}株</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th style={{verticalAlign: 'baseline'}}>価格情報</th>
                    <td>
                      <div className="price-container">
                        <div className="price-item">
                          <p className="description">取引参考価格（1株）※</p>
                          <div>
                            <span className="price">
                              {this.formattedTransactionPrice(orderPrice)}
                            </span>
                            &nbsp;
                            円
                          </div>
                        </div>
                        <div className="price-item">
                          {/*<p className="description" style={{textAlign: 'right'}}>*/}
                          {/*  最終更新：{this.formattedUpdateTime(orderPrice)}*/}
                          {/*</p>*/}
                        </div>
                      </div>
                      <div className="price-container">
                        <div className="price-item">
                          <p className="description">参考為替レート（米ドル）</p>
                          <div>
                            <span className="price">
                              {this.formattedExchangeRate(orderPrice)}
                            </span>
                            &nbsp;
                            円
                          </div>
                        </div>
                        <div className="price-item">
                          <p className="description">為替コスト</p>
                          <div>
                            <span className="price">
                              {this.formattedCommission(orderPrice)}
                            </span>
                            &nbsp;
                            円
                          </div>
                        </div>
                      </div>
                      <div className="notice">
                        <div style={{marginRight: '15px'}}>※</div>
                        <div>
                        ・取引参考価格は前日終値を基準として、参考為替レートを適用した価格になります。<br />
                        ・実際の取引価格は米国市場が開いた後に注文が速やかに発注され、約定した株の平均価格に対して <br />
                        　当社の定める為替コスト反映後のレートを適用した価格になります。<br/>
                          <a href="https://smartplus-sec.com/stream/service/products/us-stock/" target="_blank" rel="noopener noreferrer">&ensp; 米国株式取引ルール</a>

                        </div>

                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>取引期限</th>
                    <td>当日限り</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="u-mt20p">
          <Link className="c-button c-button_cancel" to="/account/us-stock">一覧へ戻る</Link>
          <input className="c-button" type="submit" value="確認画面へ" disabled={!quantity || (orderType === 'Limit' && !price)} />
        </div>
      </form>
    );
  }
}

export default OrderForm;
