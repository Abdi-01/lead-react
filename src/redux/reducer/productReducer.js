import { GET_ALL_PRODUCT, GET_PRODUCT_PAGINATION } from '../action/types'

const INITIAL_STATE = {
    allProduct: [],
    pagiProduct: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCT:
            return { ...state, allProduct: action.payload }
        case GET_PRODUCT_PAGINATION:
            return { ...state, pagiProduct: action.payload }
        default:
            return state
    }
}