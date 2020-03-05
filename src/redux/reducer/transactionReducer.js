import { USER_GET_TRANSACTION } from '../action/types'

const INITIAL_STATE = []

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_GET_TRANSACTION:
            return action.payload
        default:
            return state
    }
}