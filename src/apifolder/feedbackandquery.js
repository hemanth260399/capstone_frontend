import axios from "axios";
let url = import.meta.env.VITE_BE_URL
export let addfeedbackandqueryapi = async (data) => {
    try {
        let response = await axios.post(`${url}/addfeedback`, data,
                                       {
                headers: {
                    "auth-token": localStorage.getItem("token") || "",
                },
            })
        return response.data
    } catch (err) {
        throw new Error(err.response.data.msg)
    }
}
export let getfeedbackapi = async () => {
    try {
        let response = await axios.get(`${url}/allfeedback`,
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
export let getqueryapi = async (data) => {
    try {
        let response = await axios.post(`${url}/allqueries`, data,
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
export let actionqueryapi = async (id, data) => {
    try {
        let response = await axios.patch(`${url}/allqueries?id=${id}`, data,
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
