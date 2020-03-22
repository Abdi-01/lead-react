import Axios from 'axios'
import { API_URL } from '../../support/Backend_URL';
import { LOGIN, LOGOUT, CLEAR_USER_CART_REDUCER } from '../action/types'
import Swal from 'sweetalert2'

export const login = (username, password) => {//satu fungsi menjalankan dua reducer yang berbeda
    // let { username, password } = data
    return (dispatch) => {
        Axios.post(API_URL + `/users/login`, {
            username,
            password
        })
            .then((res) => {
                console.log(res.data)//data dari userController backend API
                if (res.data.status !== "Verified") {
                    Swal.fire({
                        text: 'Username or password invalid!',
                        imageUrl: require('../../image/ilustration/security.png'),
                        imageWidth: 190,
                        imageHeight: 150,
                        imageAlt: 'Custom image',
                        width: 210,
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    localStorage.setItem('token', res.data.token)
                    dispatch({
                        type: LOGIN, //reducer 1
                        payload: res.data
                    })
                }
            })
            .catch((err) => {
                Swal.fire({
                    text: 'Username or password invalid!',
                    imageUrl: require('../../image/ilustration/security.png'),
                    imageWidth: 190,
                    imageHeight: 150,
                    imageAlt: 'Custom image',
                    width: 210,
                    showConfirmButton: false,
                    timer: 1500
                });
                console.log(err)
                dispatch({
                    type: LOGOUT
                })
            }
            )
    }
}

export const logout = () => {
    return (dispatch) => {
        localStorage.removeItem('token')
        dispatch({
            type: LOGOUT
        })
        dispatch({
            type: CLEAR_USER_CART_REDUCER
        })
    }
}

export const Keeplogin = () => {//satu fungsi menjalankan dua reducer yang berbeda
    // let { username, password } = data
    return (dispatch) => {
        const token = localStorage.getItem('token')//ambil token dari localstorage
        console.log(token)
        if (token) {
            const headers = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            Axios.post(API_URL + `/users/keeplogin`, {}, headers)
                .then((res) => {
                    localStorage.setItem('token', res.data.token)//data dari userController backend API
                    // console.log(res.data)//data dari userController backend API
                    dispatch({
                        type: LOGIN,
                        payload: res.data
                    })
                })
                .catch((err) => {
                    // localStorage.removeItem('token')
                    console.log(err)
                    dispatch({
                        type: LOGOUT,
                    })
                }
                )
        }
    }
}

export const EditProfile = (data) => {//satu fungsi menjalankan dua reducer yang berbeda
    // let { username, password } = data
    return (dispatch) => {
        const token = localStorage.getItem('token')//ambil token dari localstorage
        console.log(token)
        if (token) {
            const headers = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            Axios.post(API_URL + `/users/editProfile`, data, headers)
                .then((res) => {
                    localStorage.setItem('token', res.data.token)//data dari userController backend API
                    console.log(res.data)//data dari userController backend API
                    Swal.fire({
                        text: 'Edit Profile Success',
                        imageUrl: require('../../image/ilustration/edit_success.png'),
                        imageWidth: 190,
                        imageHeight: 150,
                        imageAlt: 'Custom image',
                        width: 210,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    dispatch({
                        type: LOGIN,
                        payload: res.data
                    })
                })
                .catch((err) => {
                    console.log(err)
                    Swal.fire({
                        text: 'Edit Profile Fail !',
                        imageUrl: require('../../image/ilustration/password.png'),
                        imageWidth: 190,
                        imageHeight: 150,
                        imageAlt: 'Custom image',
                        width: 210,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    // dispatch({
                    //     type: LOGOUT,
                    // })
                }
                )
        }
    }
}

export const EditPassword = (data) => {//satu fungsi menjalankan dua reducer yang berbeda
    // let { username, password } = data
    return (dispatch) => {
        const token = localStorage.getItem('token')//ambil token dari localstorage
        console.log(token)
        if (token) {
            const headers = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            Axios.post(API_URL + `/users/editPassword`, data, headers)
                .then((res) => {
                    localStorage.setItem('token', res.data.token)//data dari userController backend API
                    console.log(res.data)//data dari userController backend API
                    Swal.fire({
                        text: 'Edit Profile Success',
                        imageUrl: require('../../image/ilustration/edit_success.png'),
                        imageWidth: 190,
                        imageHeight: 150,
                        imageAlt: 'Custom image',
                        width: 210,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    if (res.data === 'wrong') {
                        Swal.fire({
                            text: 'Edit Profile Fail !',
                            imageUrl: require('../../image/ilustration/password.png'),
                            imageWidth: 190,
                            imageHeight: 150,
                            imageAlt: 'Custom image',
                            width: 210,
                            showConfirmButton: false,
                            timer: 1500
                        })
                    } else {
                        dispatch({
                            type: LOGIN,
                            payload: res.data
                        })
                    }
                })
                .catch((err) => {
                    // localStorage.removeItem('token')
                    console.log(err)
                }
                )
        }
    }
}