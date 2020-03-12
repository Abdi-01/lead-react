import { combineReducers } from 'redux'
import authReducers from './authReducer'
import transactionReducers from './transactionReducer'
import registerReducers from './registerReducer'
import productReducers from './productReducer'
import cartReducers from './cartReducer'

export default combineReducers({
    user: authReducers,
    transaction: transactionReducers,
    register: registerReducers,
    products: productReducers,
    cartUsers: cartReducers
})