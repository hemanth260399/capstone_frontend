import { useState } from "react"
import { addcommunicationapi } from "../apifolder/communication"
import { Loader } from "../pages/loading"

export let Addcommunication = () => {
    let [loading, setloading] = useState(false)
    let [discountstate, setdiscountstate] = useState(false)
    let [communicationdata, setcommunicationdata] = useState({
        name: "",
        email: "",
        communicationMethod: "",
        offer: "",
        followupdate: "",
        content: "",
        directmeet: ""
    })
    let [personmeet, setpersonmeet] = useState(false)
    let datachange = (e) => {
        setcommunicationdata({ ...communicationdata, [e.target.name]: e.target.value })
    }
    let discountelement = (e) => {
        if (e.target.value === "Email") {
            setdiscountstate(true)
            setcommunicationdata({ ...communicationdata, [e.target.name]: e.target.value, directmeet: "" })
            setpersonmeet(false)
        } else if (e.target.value === "Person") {
            setpersonmeet(true)
            setcommunicationdata({ ...communicationdata, [e.target.name]: e.target.value, offer: "" })
            setdiscountstate(false)
        } else {
            setdiscountstate(false)
            setcommunicationdata({ ...communicationdata, [e.target.name]: e.target.value, offer: "", directmeet: "" })
        }
    }
    let handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setloading(true)
            let data = await addcommunicationapi(communicationdata)
            alert(data.msg)
            setloading(false)
            setcommunicationdata({
                name: "",
                email: "",
                communicationMethod: "",
                offer: "",
                followupdate: "",
                content: "",
                directmeet: ""
            })
        } catch (err) {
            alert(err.message)
            setloading(false)
        }
    }
    return (
        <>
            <div style={{ margin: "10px 30px" }}>
                <h4 className="text-center text-light">Log New Communication</h4>
                <form id="communicationForm">
                    <div className="form-group">
                        <label htmlFor="customerName">Customer Name</label>
                        <input type="text" className="form-control" id="customerName" name="name" value={communicationdata.name} onChange={datachange} placeholder="Enter customer's name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="customerName">Customer Email</label>
                        <input type="email" className="form-control" id="email" name="email" value={communicationdata.email} onChange={datachange} placeholder="Enter customer's name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="communicationMethod">Communication Method</label>
                        <select className="form-control" id="communicationMethod" name="communicationMethod" onChange={discountelement} required>
                            <option value="">Select Method</option>
                            <option>Person</option>
                            <option>Email</option>
                            <option>Phone Call</option>
                        </select>
                    </div>
                    {discountstate && (
                        <div className="form-group">
                            <label htmlFor="offer">Communication Method</label>
                            <select className="form-control" id="offer" name="offer" onChange={datachange} required>
                                <option value="">Select Offer</option>
                                <option>Gift</option>
                                <option>Voucher</option>
                                <option>Coupon</option>
                            </select>
                        </div>
                    )}
                    {personmeet && (
                        <div className="form-group">
                            <label htmlFor="Meetperson">Staff Name</label>
                            <input type="text" className="form-control" id="Meetperson" name="directmeet" value={communicationdata.directmeet} onChange={datachange} placeholder="Enter Staff's Name" required />
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="communicationDate">Date</label>
                        <input type="date" className="form-control" id="communicationDate" name="followupdate" onChange={datachange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="communicationDetails">Details</label>
                        <textarea className="form-control" id="communicationDetails" rows="3" name="content" onChange={datachange} required></textarea>
                    </div>
                    <button type="submit" className="btn btn-success" onClick={handleSubmit}>Add Communication</button>
                </form>
            </div>
            {loading && <Loader />}
        </>
    )
}