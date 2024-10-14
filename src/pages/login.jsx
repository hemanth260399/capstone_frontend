import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Loader } from "./loading";
import { loginapi } from "../apifolder/registerapi";
import AppContext from "./Appcontext";
export let Login = () => {
    let { state, dispatch } = useContext(AppContext)
    let [logindetail, setlogindetail] = useState({ email: "", password: "" })
    let [loading, setloading] = useState(false)
    let navigate = useNavigate()
    let datachange = (e) => {
        setlogindetail({ ...logindetail, [e.target.name]: e.target.value })
    }
    let loginsubmit = async (e) => {
        e.preventDefault()
        try {
            setloading(true)
            let { msg, staffdetails, token } = await loginapi(logindetail)
            setloading(false)
            alert(msg)
            localStorage.setItem("useremail", JSON.stringify(staffdetails))
            localStorage.setItem("token", token)
            dispatch({ type: "LOGIN", payload: staffdetails })
            navigate("/userpage")
        } catch (e) {
            setloading(false)
            console.log(e.message)
            alert(e.message)
        }
    }
    if (state.autentication) {
        return <Navigate to="/userpage" />
    }
    return (
        <>
            <div className="container d-flex align-items-center justify-content-center vh-100">
                <div className="card" style={{ width: '25rem', borderColor: 'green' }}>
                    <div className="card-body">
                        <h3 className="text-center" style={{ color: 'green' }}>Login</h3>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="email" name="email" onChange={datachange} value={logindetail.email} placeholder="Enter email" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" name="password" onChange={datachange} value={logindetail.password} placeholder="Password" required />
                            </div>
                            <button type="submit" className="btn" onClick={loginsubmit} style={{ backgroundColor: 'green', color: 'white' }}>Login</button>
                        </form>
                        <div className="text-center mt-3">
                            <Link to="forgetpassword" style={{ color: 'green' }}>Forgot password?</Link>
                            <Link to="register" style={{ color: 'green', marginLeft: 30 }}>Register</Link>
                        </div>
                    </div>
                </div>
            </div>
            {loading && <Loader />}
        </>
    )
}