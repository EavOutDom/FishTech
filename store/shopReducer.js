export const shopReducer = (state, { type, payload }) => {
  switch (type) {
    case 'ADD_TO_CART':
      localStorage.setItem('fishList', JSON.stringify(payload));
      return {
        ...state,
        fishList: payload
      }
    case 'REMOVED_FROM_CART':
      localStorage.setItem('fishList', JSON.stringify(payload));
      return {
        ...state,
        fishList: payload
      }
    default:
      return state;
  }
}