import {LOGIN,LOGOUT} from '../action/types'

const INITIAL_STATE = {
    id: 0,
    username: '',
    email: '',
    phone: '',
    role: '',
    status: '',
    token: ''
}

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
                phone: action.payload.phone,
                role: action.payload.role,
                token: action.payload.token,
                status: action.payload.status
            }
        case LOGOUT:
            return INITIAL_STATE
        default:
            return state
    }
}

export default authReducer