import {LOAD_ORDERS_SUCCESS, LOAD_ORDERS_US_SUCCESS} from '../constants/order';



const initialState = {
  orders: [],
  currentPage: null,
  totalPages: null,
  request: null
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ORDERS_SUCCESS:
      return {
        orders: action.orders,
        currentPage: action.currentPage,
        totalPages: action.totalPages
      };
    case LOAD_ORDERS_US_SUCCESS:
      return {
        ...state,
        request: action.request
      };
    default:
      return state;
  }
}


export default orderReducer;
