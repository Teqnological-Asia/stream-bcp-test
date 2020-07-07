export const marginStockPositions = (state) => (
  state.marginReducer.stock ? state.marginReducer.stock.positions : []
)