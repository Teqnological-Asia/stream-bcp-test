import { LOAD_US_STOCK_BALANCES_SUCCESS, LOAD_US_STOCKS_SUCCESS } from "../constants/usStock";

const initialState = {
  usStockBalances: [],
  usStocks: [],
};

export const usStockReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_US_STOCK_BALANCES_SUCCESS:
      return {
        ...state,
        usStockBalances: action.usStockBalances,
      };
    case LOAD_US_STOCKS_SUCCESS:
      return {
        ...state,
        usStocks: action.usStocks,
      };
    default:
      return state;
  }
};

export default usStockReducer;
