import Axios from 'axios'
import { API_URL } from '../../support/Backend_URL';
import {
    GET_SALES_AMOUNT, GET_USER_AMOUNT, GET_PENDING_ORDER_AMOUNT,
    GET_SUCCESS_ORDER_AMOUNT, GET_CATEGORY_SALES_AMOUNT
} from '../action/types'

export const getSalesAmount = () => {
    return async (dispatch) => {
        try {
            let res = await Axios.get(API_URL + '/results/getSaleAmount')
            dispatch({
                type: GET_SALES_AMOUNT,
                payload: res.data[0].salesAmount
            })
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const getUserAmount = () => {
    return async (dispatch) => {
        try {
            let res = await Axios.get(API_URL + '/results/getUserAmount')
            dispatch({
                type: GET_USER_AMOUNT,
                payload: res.data[0].userAmount
            })
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const getPendingOrderAmount = () => {
    return async (dispatch) => {
        try {
            let res = await Axios.get(API_URL + '/results/getPendingOrderAmount')
            dispatch({
                type: GET_PENDING_ORDER_AMOUNT,
                payload: res.data[0].pendingAmount
            })
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const getSuccessOrderAmount = () => {
    return async (dispatch) => {
        try {
            let res = await Axios.get(API_URL + '/results/getSuccessOrderAmount')
            dispatch({
                type: GET_SUCCESS_ORDER_AMOUNT,
                payload: res.data[0].successAmount
            })
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const getCategorySale = () => {
    return async (dispatch) => {
        try {
            let res = await Axios.get(API_URL + '/results/getCategorySale')
            let labelData = []
            let qtyData = []
            res.data.map((val) => {
                labelData.push(val.category)
                qtyData.push(val.qty)
                // pieData.push(val.qty)
            })
            dispatch({
                type: GET_CATEGORY_SALES_AMOUNT,
                payload: { label: labelData, dataset: qtyData }
            })
        }
        catch (err) {
            console.log(err)
        }
    }
}