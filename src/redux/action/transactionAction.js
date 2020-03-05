import Axios from 'axios'
import { API_URL } from '../../support/Backend_URL';
import { USER_GET_TRANSACTION } from '../action/types'

export const getUserTransaction = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token')
            var res = await Axios.get(API_URL + `/transactions/getTransaction`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            // console.log(res.data)
            dispatch({
                type: USER_GET_TRANSACTION,
                payload: res.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}