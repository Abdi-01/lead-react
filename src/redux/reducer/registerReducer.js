import { REGIS_USER } from '../action/types'
const INITIAL_STATE = {
    redirect: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REGIS_USER:
            return { redirect: true }
        default:
            return state
    }

}