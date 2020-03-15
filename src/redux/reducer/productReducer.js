import { GET_ALL_PRODUCT, GET_PRODUCT_PAGINATION,
     GET_SIZES,GET_MATERIALS,GET_STOCK,GET_CATEGORIES } from '../action/types'

const INITIAL_STATE = {
    allProduct: [],
    pagiProduct: [],
    sizes: [],
    materials:[],
    stocks:[],
    categories:[]
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCT:
            return { ...state, allProduct: action.payload }
        case GET_PRODUCT_PAGINATION:
            return { ...state, pagiProduct: action.payload }
        case GET_SIZES:
            return { ...state, sizes: action.payload }
        case GET_MATERIALS:
            return { ...state, materials: action.payload }
        case GET_STOCK:
            return { ...state, stocks: action.payload }
        case GET_CATEGORIES:
            return { ...state, categories: action.payload }
        default:
            return state
    }
}