import { useContext, useEffect, useState } from "react";
import { deletecustomerdataapi, singlecustomerdataapi } from "../apifolder/customerdata";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./customerdetail.css"
import AppContext from "../pages/Appcontext";
export const CustomerData = () => {
    let { dispatch } = useContext(AppContext)
    const [params] = useSearchParams();
    let [customer, setCustomer] = useState([]);
    let navigate = useNavigate()
    let customerdata = async () => {
        try {
            let data = await singlecustomerdataapi(params.get("id"))
            setCustomer(data)
        } catch (err) {
            alert(err.message)
        }
    }
    useEffect(() => {
        customerdata();
    }, []);
    let deletebutton = async () => {
        try {
            let data = await deletecustomerdataapi(params.get("id"))
            alert(data.msg)
            navigate("/customerdetail")
        } catch (err) {
            alert(err.message)
        }
    }
    let updatebutton = () => {
        dispatch({ type: "EDIT_CUSTOMER", payload: customer })
        navigate("/newcustomer")
    }
    return (
        <div className="card ">
            <div style={{ marginTop: 20 }}>
                <h1 className="text-center mb-4 card-title">Customer Details</h1>
                {customer ? (
                    <div className="card p-4 card-body" style={{ backgroundColor: 'white', borderColor: 'gray' }}>
                        <h5>Name : {customer.name}</h5>
                        <p>Number : {customer.number}</p>
                        <p>Email : {customer.email}</p>
                        <p>Date : {customer.date}</p>
                        <p>Address : {customer.address}</p>
                        <p>Purchase History : {customer.purchase_history}</p>
                        <p>Purchase Value : ${customer.purchase_value}</p>
                        <p>Purchase Count : {customer.purchase_count}</p>
                        <p>Status : {customer.active}</p>
                        <p>Created Date : {customer.created_date}</p>
                        <div>
                            <button className="btn mx-auto" onClick={deletebutton}>Delete</button>
                            <button className="btn mx-auto" onClick={updatebutton}>Edit</button>
                        </div>
                    </div>
                ) : (
                    <p>Customer not found.</p>
                )}
            </div>
        </div>
    );
};
