import { useState } from "react"
import { changepasswordapi } from "../apifolder/registerapi"
import { Navigate, useNavigate, useSearchParams } from "react-router-dom"
import { Loader } from "./loading"

export let Changepassword = () => {
    let isAuthenticated = Boolean(localStorage.getItem("useremail"))
    let [password, setpassword] = useState({ password: "", newpassword: "" })
    let [loading, setloading] = useState(false)
    let navigate = useNavigate()
    let [params] = useSearchParams()
    let passwordchange = (e) => {
        setpassword({
            ...password,
            [e.target.name]: e.target.value
        })
    }
    let emailsubmit = async (e) => {
        e.preventDefault()
        try {
            e.preventDefault();
            if (password.password !== password.newpassword) {
                alert("Passwords do not match");
                return;
            }
            try {
                setloading(true)
                let response = await changepasswordapi(params.get("token"), { password: password.password });
                setloading(false)
                alert(response.msg)
                navigate("/");
            } catch (e) {
                setloading(false)
                alert(e);
                console.log("Error", e);
                navigate("/");
            }

        }
        catch (e) {
            alert(e.msg)
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
                        <h3 className="text-center" style={{ color: 'green' }}>Change Password</h3>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">New Password</label>
                                <input type="password" className="form-control" id="password" name="password" onChange={passwordchange} value={password.password} placeholder="New Password" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Confirm Password</label>
                                <input type="password" className="form-control" id="newpassword" name="newpassword" onChange={passwordchange} value={password.newpassword} placeholder="Confirm Password" required />
                            </div>
                            <button type="submit" className="btn" onClick={emailsubmit} style={{ backgroundColor: '#28a745', color: 'white', width: '100%' }}>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {loading && <Loader />}
        </>
    )
}