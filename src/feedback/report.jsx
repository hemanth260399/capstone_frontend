import { useEffect, useState } from "react";
import { allcustomerapi } from "../apifolder/customerdata";

export let Report = () => {
    let [customer, setcustomer] = useState([])
    let getdatacustomer = async () => {
        try {
            let data = await allcustomerapi()
            setcustomer(data)
        } catch (e) {
            alert(e.message)
        }
    }
    useEffect(() => {
        getdatacustomer()
    }, [])
    return (
        <div className="container mt-">
            <h1>Customer Reports</h1>
            <div className="card mb-4">
                <div className="card-header">Customer Summary</div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Purchase Value ($)</th>
                                <th>Active</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customer.map((customer) => (
                                <tr key={customer.id}>
                                    <td>{customer.id}</td>
                                    <td>{customer.name}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.purchase_value}</td>
                                    <td>{customer.active}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}