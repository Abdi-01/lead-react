import { combineReducers } from 'redux'
import authReducers from './authReducer'
import transactionReducers from './transactionReducer'
import registerReducers from './registerReducer'

export default combineReducers({
    user: authReducers,
    transaction: transactionReducers,
    register: registerReducers
})