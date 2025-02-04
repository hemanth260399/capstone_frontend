import { useContext, useEffect } from "react"
import { googleLoginApi } from "../apifolder/registerapi"
import { useNavigate } from "react-router-dom"
import AppContext from "./Appcontext"

export let LoginSuccess = () => {
    let navigate = useNavigate()
    let { dispatch } = useContext(AppContext)
    useEffect(() => {
        let getUsers = async () => {
            console.log("hello")
            try {
                let data = await googleLoginApi()
                localStorage.setItem("useremail", JSON.stringify(data.user.userdata))
                localStorage.setItem("token", data.token)
                dispatch({ type: "LOGIN", payload: data.user.userdata })
                navigate("/userpage")
            } catch (e) {
                console.log(e)
            }
        }
        getUsers()
    }, [])
    return (
        <></>
    )
}