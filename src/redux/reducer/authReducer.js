const INITIAL_STATE ={
    idusers:0,
    username : '',
    password:'',
    email:'',
    role:'',
    token:''
}

const authReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case 'LOGIN':
            return{
                // ...state,
                idusers:action.payload.idusers,
                username:action.payload.username,
                password:action.payload.password,
                email:action.payload.email,
                role:action.payload.role,
                token:action.payload.token
            }
            case 'LOGOUT':
                return INITIAL_STATE
            default:
                return state
    }
}

export default authReducer