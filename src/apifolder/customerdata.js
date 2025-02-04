import axios from "axios";
let url = import.meta.env.VITE_BE_URL
export let addcustomerapi = async (data) => {
    try {
        let response = await axios.post(`${url}/newcustomer`, data,
            {
                headers: {
                    "auth-token": localStorage.getItem("token") || "",
                },
            }
        )
        return response.data
    } catch (err) {
        throw new Error(err.response.data.msg)
    }
}
export let allcustomerapi = async () => {
    try {
        let response = await axios.get(`${url}/customerdetail`,
            {
                headers: {
                    "auth-token": localStorage.getItem("token") || "",
                },
            }
        )
        return response.data
    } catch (err) {
        throw new Error(err.response.data.msg)
    }
}
export let singlecustomerdataapi = async (id) => {
    try {
        let response = await axios.get(`${url}/customerdata?id=${id}`,
            {
                headers: {
                    "auth-token": localStorage.getItem("token") || "",
                },
            }
        )
        return response.data
    } catch (err) {
        throw new Error(err.response.data.msg)
    }
}
export let deletecustomerdataapi = async (id) => {
    try {
        let response = await axios.delete(`${url}/customerdata?id=${id}`,
            {
                headers: {
                    "auth-token": localStorage.getItem("token") || "",
                },
            }
        )
        return response.data
    } catch (err) {
        throw new Error(err.response.data.msg)
    }
}
export let editcustomerdataapi = async (data, id) => {
    try {
        let response = await axios.put(`${url}/newcustomeredit?id=${id}`, data,
            {
                headers: {
                    "auth-token": localStorage.getItem("token") || "",
                },
            }
        )
        return response.data
    } catch (err) {
        throw new Error(err.response.data.msg)
    }
}
export let dashboardapi = async () => {
    try {
        let response = await axios.get(`${url}/userpage`,
            {
                headers: {
                    "auth-token": localStorage.getItem("token") || "",
                },
            }
        )
        return response.data
    } catch (err) {
        throw new Error(err.response.data.msg)
    }
}