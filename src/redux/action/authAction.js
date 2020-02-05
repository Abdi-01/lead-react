import Axios from 'axios'
import { API_URL } from '../../support/Backend_URL';

export const login = (username, password) => {//satu fungsi menjalankan dua reducer yang berbeda
    // let { username, password } = data
    return (dispatch) => {
        Axios.post(API_URL + `/users/login`, {
            username,
            password
        })
            .then((res) => {
                console.log(res.data)//data dari userController backend API
                if (res.data.verified !== "Verified") {
                    localStorage.setItem('status', "nonVerified")
                } else {
                    localStorage.setItem('token', res.data.token)//data dari userController backend API
                    localStorage.removeItem('status')
                    dispatch({
                        type: 'LOGIN', //reducer 1
                        payload: res.data
                    })
                }
            })
            .catch((err) => {
                localStorage.removeItem('token')
                console.log(err)
                dispatch({
                    type: 'LOGOUT'
                })
            }
            )
    }
}

export const logout = () => {
    return (dispatch) => {
        localStorage.removeItem('token')
        dispatch({
            type: 'LOGOUT'
        })
    }
}

export const Keeplogin = () => {//satu fungsi menjalankan dua reducer yang berbeda
    // let { username, password } = data
    return (dispatch) => {
        const token = localStorage.getItem('token')//ambil token dari localstorage
        // console.log(token)
        if (token) {
            const headers = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            Axios.post(API_URL + `/users/keeplogin`, {}, headers)
                .then((res) => {
                    // localStorage.setItem('token', res.data.token)//data dari userController backend API
                    console.log(res.data)//data dari userController backend API
                    dispatch({
                        type: 'LOGIN', //reducer 1
                        payload: res.data
                    })
                })
                .catch((err) => {
                    // localStorage.removeItem('token')
                    console.log(err)
                    dispatch({
                        type: 'LOGOUT',
                    })
                }
                )
        }
    }
}