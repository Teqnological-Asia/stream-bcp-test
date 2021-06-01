import axios from 'axios';
import {push} from 'react-router-redux';
import {tradeTypeCancelPath} from '../components/Order/common';
import {LOAD_ORDERS_SUCCESS, GET_LOAD_SUCCESS, LOAD_ORDERS_US_SUCCESS} from '../constants/order';
import {getAuthHeader} from './auth';
import {setLoading} from '../actions/loading';


export const loadOrdersSuccess = (orders, currentPage, totalPages) => {
  return {
    type: LOAD_ORDERS_SUCCESS,
    orders,
    currentPage,
    totalPages,
  }
}

export const orderOrderUsSuccess = (request) => {
  return {
    type: LOAD_ORDERS_US_SUCCESS,
    request,

  }
}


export const loadSuccess = (load) => {
  return {
    type: GET_LOAD_SUCCESS,
    load
  }
}

export const loadRequest = (paramss, tab = 1) => {
  return dispatch => {
    dispatch(setLoading(true))
    const request = axios
      .get(`${process.env.REACT_APP_STREAM_API_HOST}/v1/stocks/us_stocks`, {
        params: {page: 1},
        headers: getAuthHeader()
      });

    return request.then((response) => {
      dispatch(loadSuccess(response.data.data.items));
      dispatch(setLoading(false))
    });
  };

}

export const loadOrdersRequest = (params, tab = 1) => {
  if (tab === 1) {
    return dispatch => {
      dispatch(setLoading(true))
      const request = axios
        .get(`${process.env.REACT_APP_BALANCE_API_HOST}/v3/orders`, {
          params: params,
          headers: getAuthHeader()
        });

      return request.then((response) => {
        const data = response.data.data;
        dispatch(loadOrdersSuccess(data.orders, data.page, data.total_pages));
        dispatch(setLoading(false))
      });
    };
  } else {
    return dispatch => {
      dispatch(setLoading(true))
      const request = axios
        .get(`${process.env.REACT_APP_BALANCE_API_HOST}/usStock/orders`, {
          params: params,
          headers: getAuthHeader()
        });

      return request.then((response) => {
        const data = response.data.data;
        dispatch(loadOrdersSuccess(data.items, data.page, data.totalPages));
        dispatch(loadRequest(params, tab))
        dispatch(setLoading(false))
      });
    };
  }

}


export const orderCancelUs = (id) => {
  const baseUrl = `https://baas-order-api-swagger.baas-dev.net/usStockOrders`
  const headers = {
    headers: getAuthHeader()
  }
  return dispatch => {
    dispatch(setLoading(true))
    const request = axios.post(
      `${baseUrl}/${id}/cancel`,
      {},
      headers
    );
    return request.then((response) => {
      const data = response.data.data
      dispatch(orderOrderUsSuccess(data));
      dispatch(setLoading(false))
    })
  };
}

export const orderCancelUsRequest = (id, request) => {
  const baseUrl = `https://baas-order-api-swagger.baas-dev.net/usStockOrders`
  const headers = {
    headers: getAuthHeader()
  }
  return dispatch => {
    dispatch(setLoading(true))
    const body = {
      wb4CheckDate: request.wb4CheckDate,
      wb4OrderID: request.wb4OrderID
    }
    const cancelSendRequest = axios.post(
      `${baseUrl}/${id}/cancel/send`,
      body,
      headers
    );

    return cancelSendRequest.then((response) => {
      dispatch(push(`/account/order/${id}/cancel/complete`));
      dispatch(setLoading(false))
    });
  }
}


export const cancelOrderRequest = (id, type) => {
  const path = tradeTypeCancelPath[type]
  const baseUrl = `${process.env.REACT_APP_ORDER_API_HOST}/${path}`
  const headers = {
    headers: getAuthHeader()
  }
  return dispatch => {
    dispatch(setLoading(true))
    const cancelNewRequest = axios.post(
      `${baseUrl}/${id}/cancel`,
      {},
      headers
    );

    return cancelNewRequest.then((response) => {
      const data = response.data.data;
      const body = {
        wb5_confirmed_at: data.wb5_confirmed_date,
        system_order_id: data.system_order_id
      }
      const cancelSendRequest = axios.post(
        `${baseUrl}/${id}/cancel/send`,
        body,
        headers
      );

      return cancelSendRequest.then((response) => {
        dispatch(push(`/account/order/${id}/cancel/complete`));
        dispatch(setLoading(false))
      });
    });
  };
}
