import {
    GET_SALES_AMOUNT, GET_USER_AMOUNT, GET_PENDING_ORDER_AMOUNT,
    GET_SUCCESS_ORDER_AMOUNT, GET_CATEGORY_SALES_AMOUNT
} from '../action/types'
const INITIAL_STATE = {
    salesAmount: 0,
    userAmount: 0,
    pendingAmount: 0,
    successAmount: 0,
    pieDataCategory: [],
    pieDataQty: [],
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_SALES_AMOUNT:
            return { ...state, salesAmount: action.payload }
        case GET_USER_AMOUNT:
            return { ...state, userAmount: action.payload }
        case GET_PENDING_ORDER_AMOUNT:
            return { ...state, pendingAmount: action.payload }
        case GET_SUCCESS_ORDER_AMOUNT:
            return { ...state, successAmount: action.payload }
        case GET_CATEGORY_SALES_AMOUNT:
            return { ...state, pieDataCategory: action.payload.label, pieDataQty:action.payload.dataset }
        default:
            return state
    }

}