import Axios from 'axios'
import { API_URL } from '../../support/Backend_URL';
import { USER_GET_TRANSACTION, GET_DETAIL_TRANSACTION,GET_CUSTOM_DETAIL_TRANSACTION } from '../action/types'
import Swal from 'sweetalert2'

export const getUserTransaction = (status) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token')
            var res = await Axios.get(API_URL + `/transactions/getTransaction/${status}`, {
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

export const getDetailTransaction = (status) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token')
            var res = await Axios.get(API_URL + `/transactions/getDetailTransaction/${status}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({
                type: GET_DETAIL_TRANSACTION,
                payload: res.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const getCustomDetailTransaction = (status) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token')
            var res = await Axios.get(API_URL + `/transactions/getCustomDetailTransaction/${status}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({
                type: GET_CUSTOM_DETAIL_TRANSACTION,
                payload: res.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const addTransaction = (formTransaction) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token')
            var res = await Axios.post(API_URL + `/transactions/addToTransaction`, formTransaction, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log('Payment Success')
            Swal.fire({
                text: 'Thank You, please check your email for payment ',
                imageUrl: require('../../image/ilustration/online_payment_.png'),
                imageWidth: 150,
                imageHeight: 150,
                imageAlt: 'Custom image',
                width: 400,
                showConfirmButton: false,
                timer: 4000
            });
        }
        catch (err) {
            console.log(err)
        }
    }
}