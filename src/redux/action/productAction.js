import Axios from 'axios'
import { API_URL } from '../../support/Backend_URL';
import {
    GET_ALL_PRODUCT,
    GET_PRODUCT_PAGINATION,
    GET_SIZES,
    GET_MATERIALS,GET_STOCK,GET_CATEGORIES
} from '../action/types'

export const getAllProduct = (category) => {
    return async (dispatch) => {
        try {
            const res = await Axios.get(API_URL + `/products/getproducts?category=${category}`)
            dispatch({ type: GET_ALL_PRODUCT, payload: res.data })
        }
        catch (err) {
            console.log(err)
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
            console.log(err)
        }
    }
}

export const getSizes = () => {
    return async (dispatch) => {
        try {
            const res = await Axios.get(API_URL + '/products/getSize')
            dispatch({ type: GET_SIZES, payload: res.data })
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const getMaterials = () => {
    return async (dispatch) => {
        try {
            const res = await Axios.get(API_URL + '/products/getMaterial')
            dispatch({ type: GET_MATERIALS, payload: res.data })
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const getStock = () => {
    return async (dispatch) => {
        try {
            const res = await Axios.get(API_URL + '/products/getStock')
            dispatch({ type: GET_STOCK, payload: res.data })
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const getCategories = () => {
    return async (dispatch) => {
        try {
            const res = await Axios.get(API_URL + '/products/getCategories')
            dispatch({ type: GET_CATEGORIES, payload: res.data })
        }
        catch (err) {
            console.log(err)
        }
    }
}
