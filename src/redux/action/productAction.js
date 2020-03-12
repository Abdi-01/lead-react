import Axios from 'axios'
import { API_URL } from '../../support/Backend_URL';
import { GET_ALL_PRODUCT, GET_PRODUCT_PAGINATION } from '../action/types'

export const getAllProduct = (category) => {
    return async (dispatch) => {
        try {
            const res = await Axios.get(API_URL + `/products/getproducts?category=${category}`)
            dispatch({ type: GET_ALL_PRODUCT, payload: res.data })
        }
        catch (err) {

        }
    }
}

export const getProductPagination = (countGet) => {
    return async (dispatch) => {
        try {
            const res = await Axios.get(API_URL + `/products/getProductLimit/${countGet}`)
            console.log(res.data)
            dispatch({ type: GET_PRODUCT_PAGINATION, payload: res.data })
        }
        catch (err) {

        }
    }
}