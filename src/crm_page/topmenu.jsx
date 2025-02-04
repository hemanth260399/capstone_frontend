import { Outlet, useNavigate } from "react-router-dom"
import "./topmenu.css";
import { Componenttopmenu } from "../components/topmenucomp";
import AppContext from "../pages/Appcontext";
import { useContext, useState } from "react";
export let Topmenu = () => {
    let { dispatch } = useContext(AppContext)
    let [toggle, settoggle] = useState(false)
    let navigate = useNavigate()
    let logout = () => {
        dispatch({ type: "LOGOUT" })
        localStorage.clear("useremail")
        localStorage.clear("token")
        navigate("/")
    }
    return (
        <>
            <div className="navbar navbar-expand-lg shadow" >
                <div className="container-fluid">
                    <div className="navbar-brand"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnF9aatq4l9FwIkoGb8KYXpGqPTI5LMYkVwg&s" alt="image" style={{ width: 50, height: 50 }} /></div>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon toggleButton" onClick={() => { settoggle(!toggle) }}>{toggle ? <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/delete-sign--v1.png" alt="delete-sign--v1" /> : <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/menu--v1.png" alt="menu--v1" />}</span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <Componenttopmenu position={"single"} location={"/userpage"} tabname={"Dashboard"} />
                        <button className="btn" style={{ position: "absolute", right: 0, marginRight: 40, backgroundColor: "orange", zIndex: 99 }} onClick={logout}>Log Out</button>
                        <Componenttopmenu position={"multiple"} location={"/customerdetail"} tabname={"Customer"} arrayoflist={["Customer Profile", "Add new Customer"]} loactionoflist={["/customerdetail", "/newcustomer"]} />
                        <Componenttopmenu position={"multiple"} tabname={"Communication"} arrayoflist={["All Communication", "Add communication"]} loactionoflist={["/allcommunication", "/addcommunication"]} />
                        <Componenttopmenu position={"multiple"} tabname={"Feedback"} arrayoflist={["All Feedback", "All Queries", "Add Feedback or Queries",]} loactionoflist={["/allfeedback", "/allqueries", "/addfeedback"]} />
                        <Componenttopmenu position={"single"} location={"/report"} tabname={"Reports"} />
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    )
}