export const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                cart: [...state.cart, action.payload],
            };
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cart: state.cart.filter(item => item.product !== action.payload),
            };
        case 'UPDATE_CART':
            return {
                ...state,
                cart: action.payload,
            };
        default:
            return state;
    }
};