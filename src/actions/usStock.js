import { setLoading } from "./loading";
import axios from "axios";
import { getAuthHeader } from "./auth";
import { LOAD_US_STOCK_BALANCES_SUCCESS, LOAD_US_STOCKS_SUCCESS } from "../constants/usStock";

export const loadUsStockBalancesSuccess = (usStockBalances) => {
  return {
    type: LOAD_US_STOCK_BALANCES_SUCCESS,
    usStockBalances,
  };
};

export const loadUsStocksSuccess = (usStocks) => {
  return {
    type: LOAD_US_STOCKS_SUCCESS,
    usStocks,
  };
};

export const loadUsStockBalancesRequest = () => {
  return (dispatch) => {
    dispatch(setLoading(true));
    const request = axios.get(
      `${process.env.REACT_APP_BALANCE_API_HOST}/usStock/balances`,
      {
        headers: getAuthHeader(),
      }
    );

    return request.then((response) => {
      dispatch(loadUsStockBalancesSuccess(response.data.data));
      dispatch(setLoading(false));
    });
  };
};

export const loadUsStocksRequest = () => {
  return (dispatch) => {
    dispatch(setLoading(true));
    const request = axios.get(
        `${process.env.REACT_APP_STREAM_API_HOST}/v1/stocks/us_stocks`,
        {
          headers: getAuthHeader(),
          params: {
            page: 1,
          }
        }
    );

    return request.then((response) => {
      dispatch(loadUsStocksSuccess(response.data.data));
      dispatch(setLoading(false));
    });
  };
};