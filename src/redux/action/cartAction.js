import Axios from 'axios'
import { API_URL } from '../../support/Backend_URL';
import { GET_USER_CART, CLEAR_USER_CART_REDUCER } from './types'

export const getCart = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token')
            if (token) {
                var res = await Axios.get(API_URL + `/carts/getCart`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                let count = 0
                res.data.map((val) => count += val.price)
                // console.log('Get Cart Total Cart :', count)
                res.data.totalPrice = count
                let weight = 0
                res.data.map((val) => weight += 200 * parseInt(val.qty))
                res.data.totalWeight = weight

                // console.table('Get Cart Data :', res.data)
                // console.log(res.data.totalPrice)
                dispatch({
                    type: GET_USER_CART,
                    payload: res.data
                })
            } else {
                dispatch({
                    type: CLEAR_USER_CART_REDUCER
                })
            }

        } catch (err) {
            console.log('Get Cart Error :', err)
        }
    }
}