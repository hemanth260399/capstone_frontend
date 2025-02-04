import axios from "axios";
let url = import.meta.env.VITE_BE_URL
export let addfeedbackandqueryapi = async (data) => {
    try {
        let response = await axios.post(`${url}/addfeedback`, data,
<<<<<<< HEAD
            {
                headers: {
                    "auth-token": localStorage.getItem("token") || "",
                },
            }
        )
=======
                                       {
                headers: {
                    "auth-token": localStorage.getItem("token") || "",
                },
            })
>>>>>>> e02ef40abc3111562b6736db37f8f4d6e6528a50
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
        let response = await axios.put(`${url}/allqueries?id=${id}`, data,
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
