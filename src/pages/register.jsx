import { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { Registerapi } from "../apifolder/registerapi"
import { Loader } from "./loading"

export let Register = () => {
    let isAuthenticated = Boolean(localStorage.getItem("useremail"))
    let [registerdetail, setregisterdetails] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmpassword: "",
        role: ""
    })
    let [loading, setloading] = useState(false)
    let navigate = useNavigate()
    let datachange = (e) => {
        setregisterdetails({ ...registerdetail, [e.target.name]: e.target.value })
    }
    let registersubmit = async (e) => {
        e.preventDefault()
        if (registerdetail.password !== registerdetail.confirmpassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            delete registerdetail.confirmpassword;
            setloading(true);
            const response = await Registerapi(registerdetail);
            setloading(false);
            alert(response.msg);
            navigate("/");
        } catch (e) {
            setloading(false)
            alert("Something Went Wrong, Please try again later");
            console.log("Error", e);
        }
        setregisterdetails({
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmpassword: "",
            role: ""
        })
    }
    if (isAuthenticated) {
        return <Navigate to="/userpage" />
    }
    return (
        <>
            <div className="container d-flex align-items-center justify-content-center min-vh-80">
                <div className="card" style={{ width: '25rem', borderColor: 'green' }}>
                    <div className="card-body">
                        <h3 className="text-center" style={{ color: 'green' }}>Register</h3>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="name" name="name" value={registerdetail.name} onChange={datachange} placeholder="Enter your name" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="email" name="email" value={registerdetail.email} onChange={datachange} placeholder="Enter email" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Phone Number</label>
                                <input type="tel" className="form-control" id="phone" name="phone" value={registerdetail.phone} onChange={datachange} placeholder="Enter phone number" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="role" className="form-label">Role</label>
                                <select className="form-select" id="role" name="role" value={registerdetail.role} onChange={datachange} required>
                                    <option value="" disabled selected>Select role</option>
                                    <option value="staff">Staff</option>
                                    <option value="tl">Team Leader</option>
                                    <option value="manager">Manager</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" name="password" value={registerdetail.password} onChange={datachange} placeholder="Password" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                <input type="password" className="form-control" id="confirmPassword" name="confirmpassword" value={registerdetail.confirmpassword} onChange={datachange} placeholder="Confirm Password" required />
                            </div>
                            <button type="submit" className="btn" onClick={registersubmit} style={{ backgroundColor: 'green', color: 'white' }}>Register</button>
                        </form>
                        <div className="text-center mt-3">
                            <Link to="/" style={{ color: 'green' }}>Already have an account? Login</Link>
                        </div>
                    </div>
                </div>
            </div>
            {loading && <Loader />}
        </>
    )
}