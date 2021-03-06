import { USER_GET_TRANSACTION, GET_DETAIL_TRANSACTION, GET_CUSTOM_DETAIL_TRANSACTION } from '../action/types'

const INITIAL_STATE = {
    userTransReducer: [],
    getDetailReducer: [],
    getCustomDetailReducer: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_GET_TRANSACTION:
            console.log("UGT", action.payload)
            return { ...state, userTransReducer: action.payload }
        case GET_DETAIL_TRANSACTION:
            console.log("GDT", action.payload)
            return { ...state, getDetailReducer: action.payload }
        case GET_CUSTOM_DETAIL_TRANSACTION:
            console.log("GDT", action.payload)
            return { ...state, getCustomDetailReducer: action.payload }
        default:
            return state
    }
}