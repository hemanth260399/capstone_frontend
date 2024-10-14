import { useContext, useEffect, useState } from "react"
import "./addnewcus.css"
import { addcustomerapi, editcustomerdataapi } from "../apifolder/customerdata"
import AppContext from "../pages/Appcontext"
export let Addnewcus = () => {
    let { state, dispatch } = useContext(AppContext)
    let [customer, setcustomer] = useState({
        name: "",
        number: "",
        email: "",
        date: "",
        address: "",
        purchase_history: "",
        purchase_value: 0,
        purchase_count: 0,
    })
    let datachange = (e) => {
        setcustomer({ ...customer, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        if (Object.keys(state.editcustomer).length > 0) {
            setcustomer(state.editcustomer)
        }
    }, [state.editcustomer.id])

    let handleSubmit = async (e) => {
        e.preventDefault()
        if (Object.keys(state.editcustomer).length > 0) {
            let data = await editcustomerdataapi(customer, state.editcustomer.id)
            alert(data.msg)
            dispatch({ type: "EDIT_CUSTOMER", payload: {} })
        } else {
            try {
                let data = await addcustomerapi(customer)
                alert(data.msg)
            } catch (e) {
                alert(e.message)
            }
        }
        setcustomer({
            name: "",
            number: "",
            email: "",
            date: "",
            address: "",
            purchase_history: "",
            purchase_value: 0,
            purchase_count: 0,
        })
    }
    return (
        <>
            <div className="form-container">
                <form className="customer-form">
                    <h2>Customer Information</h2>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" className="form-control" id="name" name="name" value={customer.name} required onChange={datachange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="number">Number:</label>
                        <input type="tel" className="form-control" id="number" name="number" value={customer.number} onChange={datachange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" className="form-control" id="email" name="email" value={customer.email} onChange={datachange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <textarea className="form-control" id="address" name="address" value={customer.address} onChange={datachange} required></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="purchase-history">Purchase History:</label>
                        <textarea className="form-control" id="purchase-history" name="purchase_history" value={customer.purchase_history} onChange={datachange} required></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Purchase Date : </label>
                        <input type="date" id="date" name="date" value={customer.date} onChange={datachange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="purchase-value">Purchase Value:</label>
                        <input type="number" className="form-control" id="purchase-value" name="purchase_value" value={customer.purchase_value} onChange={datachange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="purchase-count">Purchase Count:</label>
                        <input type="number" className="form-control" id="purchase-count" name="purchase_count" value={customer.purchase_count} onChange={datachange} required />
                    </div>
                    <button type="submit" className="btn-submit" onClick={handleSubmit}>{Object.keys(state.editcustomer).length > 0 ? "Edit" : "Submit"}</button>
                </form>
            </div>
        </>
    )
}
