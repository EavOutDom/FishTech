export const shopReducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_CART':
      localStorage.setItem('fishList', JSON.stringify(payload));
      return {
        ...state,
        fishList: payload
      }
    case 'SET_DARK':
      if (payload) {
        localStorage.setItem('darkMode', payload);
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.removeItem('darkMode');
      }
      return {
        ...state,
        isDark: payload
      }
    default:
      return state;
  }
}