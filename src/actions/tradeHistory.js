import axios from 'axios';
import qs from 'qs';
import { LOAD_TRADE_HISTORIES_SUCCESS } from '../constants/tradeHistory';
import { getAuthHeader } from './auth';
import { setLoading } from '../actions/loading';

export const loadTradeHistoriesSuccess = (tradeHistories, currentPage, totalPages) => {
  return {
    type: LOAD_TRADE_HISTORIES_SUCCESS,
    tradeHistories,
    currentPage,
    totalPages
  }
}

export const loadTradeHistoriesRequest = (params) => {
  return dispatch => {
    dispatch(setLoading(true))
    const request = axios
                      .get(`${process.env.REACT_APP_BALANCE_API_HOST}/trades`, {
                        params: params,
                        paramsSerializer: (params) => (
                          qs.stringify(params, {arrayFormat: 'repeat'})
                        ),
                        headers: getAuthHeader()
                      });

    return request.then((response) => {
      const data = response.data.data;
      dispatch(loadTradeHistoriesSuccess(data.trades, data.page, data.total_pages));
      dispatch(setLoading(false))
    });
  };
}