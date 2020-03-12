import { GET_USER_CART, CLEAR_USER_CART_REDUCER } from '../action/types'

const INITIAL_STATE = {
    cartUsers: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_USER_CART:
            return { cartUsers: action.payload }
        case CLEAR_USER_CART_REDUCER:
            return INITIAL_STATE
        default:
            return state
    }
}