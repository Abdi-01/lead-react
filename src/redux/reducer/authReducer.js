const INITIAL_STATE = {
    idusers: 0,
    username: null,
    // password:'',
    email: '',
    phone: '',
    address: '',
    role: '',
    token: '',
    verified: false
}

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                // ...state,
                idusers: action.payload.idusers,
                username: action.payload.username,
                // password:action.payload.password,
                email: action.payload.email,
                phone: action.payload.phone,
                address: action.payload.address,
                role: action.payload.role,
                token: action.payload.token,
                verified: action.payload.verified
            }
        case 'LOGOUT':
            return INITIAL_STATE
        default:
            return state
    }
}

export default authReducer