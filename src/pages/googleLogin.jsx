import { useContext, useEffect, useState } from "react"
import { googleLoginApi } from "../apifolder/registerapi"
import { useNavigate } from "react-router-dom"
import AppContext from "./Appcontext"

export let LoginSuccess = () => {
    let navigate = useNavigate()
    let [loading, setloading] = useState(false)
    let { dispatch } = useContext(AppContext)
    useEffect(() => {
        let getUsers = async () => {
            try {
                setloading(true)
                let data = await googleLoginApi()
                setloading(false)
                localStorage.setItem("useremail", JSON.stringify(data.user.userdata))
                localStorage.setItem("token", data.token)
                dispatch({ type: "LOGIN", payload: data.user.userdata })
                navigate("/userpage")
            } catch (e) {
                setloading(false)
                console.log(e)
            }
        }
        getUsers()
    }, [])
    return (
        <>
            {loading && <Loader />
            }</>
    )
}