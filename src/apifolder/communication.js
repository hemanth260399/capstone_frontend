import axios from "axios";
let url = import.meta.env.VITE_BE_URL
export let addcommunicationapi = async (data) => {
    try {
        let response = await axios.post(`${url}/addcommunication`, data,
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
export let allcommunicationapi = async () => {
    try {
        let response = await axios.get(`${url}/allcommunication`,
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
export let deletecommunicationapi = async (id) => {
    try {
        console.log(id)
        let response = await axios.delete(`${url}/allcommunication?id=${id}`,
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