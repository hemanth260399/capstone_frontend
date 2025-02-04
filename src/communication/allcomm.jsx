import { useEffect, useState } from "react";
import "./allcomm.css"
import { allcommunicationapi, deletecommunicationapi } from "../apifolder/communication";
import { Loader } from "../pages/loading";
export let Allcommuication = () => {
    let [communication, setcommunication] = useState([])
    let [loading, setloading] = useState(false)

    useEffect(() => {
        let getCommunicationData = async () => {
            try {
                let data = await allcommunicationapi()
                setcommunication(data)
            } catch (e) {
                alert(e.message)
            }
        }
        getCommunicationData()
    }, []);
    let deletecomm = async (id) => {
        try {
            setloading(true)
            let data = await deletecommunicationapi(id)
            alert(data.msg)
            setloading(false)
        } catch (err) {
            alert(err.message)
            setloading(false)
        }
    }
    return (
        <div className="container mt-4">
            <h2 className="text-center text-light">Customer Details</h2>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th>S.No</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Communication Method</th>
                            <th>Offer</th>
                            <th>Direct Meet</th>
                            <th>Follow-Up Date</th>
                            <th>Content</th>
                            <th>Discount Code</th>
                            <th>Coupon Value</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {communication.map((customer, index) => (
                            <tr key={customer.id}>
                                <td className="text-center">{index + 1}</td>
                                <td>{customer.id}</td>
                                <td>{customer.name}</td>
                                <td>{customer.email}</td>
                                <td className="text-center">{customer.communicationMethod}</td>
                                <td className="text-center">{customer.offer ? customer.offer : "No"}</td>
                                <td className="text-center">{customer.directmeet ? customer.directmeet : <h4>-</h4>}</td>
                                <td>{customer.followupdate}</td>
                                <td>{customer.content}</td>
                                <td>{customer.discountproduct ? customer.discountproduct : <h4>-</h4>}</td>
                                <td>{customer.couponvalue ? customer.couponvalue : <h4>-</h4>}</td>
                                <td><button className="btn" onClick={() => deletecomm(customer.id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {loading && <Loader />}
        </div>
    );
};