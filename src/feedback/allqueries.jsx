import { useEffect, useState } from "react"
import { Loader } from "../pages/loading"
import { actionqueryapi, getqueryapi } from "../apifolder/feedbackandquery"

export let Allqueries = () => {
    let [queries, setqueries] = useState([])
    let [loading, setloading] = useState(false)
    let [statuss, setstatuss] = useState({ status: "Resolve", remark: "" })
    let [filter, setfilter] = useState({ filter: "All" })
    let datachange = (e) => {
        setstatuss({ ...statuss, [e.target.name]: e.target.value })
    }
    let filterchange = (e) => {
        setfilter({ ...filter, filter: e.target.value })
    }
    let handleSubmit = async (id) => {
        try {
            setloading(true)
            let response = await actionqueryapi(id, statuss)
            alert(response.msg)
            setloading(false)
            setstatuss({ status: "Resolve", remark: "" })
        } catch (e) {
            alert(e.message)
            setloading(false)
        }
    }
    useEffect(() => {
        let getquery = async () => {
            try {
                let data = await getqueryapi(filter)
                setqueries(data)
            } catch (e) {
                alert(e.message)
            }
        }
        getquery()
    })
    return (
        <>
            <div className="container mt-4 text-center">
                <div style={{ display: "inline-flex" }}>
                    <h2 className="text-center text-light">QUERIES</h2>
                    <div className="form-group text-right">
                        <select className="form-control mx-5" id="filter" name="filter" onChange={filterchange}>
                            <option value="All">All</option>
                            <option value="Reject">Reject</option>
                            <option value="Resolve">Resolve</option>
                            <option value="Pending">Pending</option>
                        </select>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>S.No</th>
                                <th>Date</th>
                                <th>Name</th>
                                <th>Contact Number</th>
                                <th>Email</th>
                                <th>Query ID</th>
                                <th>Query</th>
                                <th>Status</th>
                                <th>Action</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                queries.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.Date}</td>
                                        <td>{item.name}</td>
                                        <td>{item.number}</td>
                                        <td>{item.email}</td>
                                        <td>{item.id}</td>
                                        <td>{item.Content}</td>
                                        <td>{item.status}</td>
                                        {item.status === "Pending" ?
                                            (<td> <div className="form-group">
                                                <select className="form-control" id="status" name="status" value={statuss.status} onChange={datachange}>
                                                    <option value="Resolve">Resolve</option>
                                                    <option value="Reject">Reject</option>
                                                </select>
                                            </div></td>) : (<td></td>)}
                                        {item.status === "Pending" ?
                                            (<td >
                                                <div className="form-group text-center" style={{ display: "inline-flex" }}>
                                                    <input type="text" className="form-control" id="remark" name="remark" placeholder="Remark" value={statuss.remark} required onChange={datachange} />
                                                    <button type="submit" className="btn btn-success" onClick={() => handleSubmit(item.id)}>✔</button>
                                                </div>
                                            </td>) :
                                            (<td>{item.remark}</td>)
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div >
            {loading && <Loader />
            }
        </>
    )
}