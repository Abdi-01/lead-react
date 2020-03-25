import Axios from 'axios'
import { API_URL } from '../../support/Backend_URL';
import { REGIS_USER, LOGIN, LOGOUT } from '../action/types'
import Swal from 'sweetalert2'


export const registerUser = (form) => {
    return async (dispatch) => {
        try {
            var resCheck = await Axios.get(API_URL + `/users/getSearchUsers?user=${form.username}&email=${form.email}`)
            console.log(resCheck.data)
            if (resCheck.data.length !== 0) {
                Swal.fire({
                    text: 'Username has been taken',
                    imageUrl: require('../../image/ilustration/user_statusWrong.png'),
                    imageWidth: 220,
                    imageHeight: 130,
                    imageAlt: 'Custom image',
                    width: 230,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            else if (form.password.length > 8) {
                Swal.fire({
                    imageUrl: require('../../image/ilustration/loading_.png'),
                    imageWidth: 220,
                    imageHeight: 130,
                    imageAlt: 'Custom image',
                    width: 230,
                    showConfirmButton: false
                });
                form.role = 'user'
                var resSubmit = await Axios.post(API_URL + `/users/register`, form)
                console.log('Regis Success' + resSubmit.data)
                Swal.fire({
                    text: 'Successfully, please check your email to verification!',
                    imageUrl: require('../../image/ilustration/new_message.png'),
                    imageWidth: 220,
                    imageHeight: 150,
                    imageAlt: 'Custom image',
                    width: 230,
                    showConfirmButton: false,
                    timer: 3500
                });
                if (resSubmit.data) {
                    dispatch({ type: REGIS_USER, payload:true })
                }
            }
            else {
                Swal.fire({
                    text: 'Your password is fail',
                    imageUrl: require('../../image/ilustration/user_statusWrong.png'),
                    imageWidth: 190,
                    imageHeight: 150,
                    imageAlt: 'Custom image',
                    width: 210,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const accountVerification = (verify) => {
    return async (dispatch) => {
        try {
            let res = await Axios.post(API_URL + `/users/emailVerification`, { otp: verify.otp }, {
                headers: {
                    'Authorization': `Bearer ${verify.token}`
                }
            })
            console.log('acVer', res.data)
            localStorage.setItem('token', res.data.token)
            dispatch({
                type: LOGIN, //reducer 1
                payload: res.data
            })
        }
        catch (err) {
            console.log(err)
            dispatch({
                type: LOGOUT
            })
        }
    }
}
