import { useState } from "react"
import { forgetpasswordapi } from "../apifolder/registerapi"
import { Loader } from "./loading"
import { Navigate, useNavigate } from "react-router-dom"

export let Forgetpassword = () => {
    let isAuthenticated = Boolean(localStorage.getItem("useremail"))
    let [userdata, setuserdata] = useState({ email: "" })
    let [loading, setloading] = useState(false)
    let navigate = useNavigate()
    let datachange = (e) => {
        setuserdata({ ...userdata, [e.target.name]: e.target.value })
    }
    let emailsubmit = async (e) => {
        e.preventDefault()
        try {
            setloading(true)
            let response = await forgetpasswordapi(userdata)
            setloading(false)
            alert(response.msg)
            navigate("/")
        } catch (e) {
            setloading(false)
            alert(e.message)
        }
    }
    if (isAuthenticated) {
        return <Navigate to="/userpage" />
    }
    return (
        <>
            <div className="container d-flex align-items-center justify-content-center vh-80">
                <div className="card" style={{ width: '25rem', borderColor: 'green' }}>
                    <div className="card-body">
                        <h3 className="text-center" style={{ color: 'green' }}>Login</h3>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="email" name="email" onChange={datachange} value={userdata.email} placeholder="Enter email" required />
                            </div>
                            <button type="submit" className="btn" onClick={emailsubmit} style={{ backgroundColor: '#28a745', color: 'white', width: '100%' }}>
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {loading && <Loader />}
        </>
    )
}