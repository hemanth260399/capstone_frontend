import axios from "axios";
let url = import.meta.env.VITE_BE_URL
export let Registerapi = async (data) => {
    try {
        let response = await axios.post(`${url}/register`, data)
        return response.data
    } catch (err) {
        throw new Error(err.response.data.msg)
    }
}
export let verifyuseremail = async (token) => {
    try {
        let response = await axios.post(`${url}/register-verify-email?token=${token}`)
        return response.data
    } catch (err) {
        throw new Error(err.response.data.msg)
    }
}
export let loginapi = async (data) => {
    try {
        let response = await axios.post(`${url}/login`, data)
        return response.data
    } catch (err) {
        throw new Error(err.response.data.msg)
    }
}
export let forgetpasswordapi = async (data) => {
    try {
        let response = await axios.post(`${url}/forgetpassword`, data)
        return response.data
    } catch (err) {
        throw new Error(err.response.data.msg)
    }
}
export let changepasswordapi = async (token, data) => {
    try {
        let response = await axios.post(`${url}/changepassword?token=${token}`, data)
        return response.data
    } catch (err) {
        throw new Error(err.response.data.msg)
    }
}
export let googleLoginApi = async () => {
    try {
        let response = await axios.get(`${url}/auth/loginSuccess`, {
            withCredentials: true,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': 'true',
            }
        })
        return response.data
    } catch (err) {
        throw new Error(err.response.data.msg)
    }
}