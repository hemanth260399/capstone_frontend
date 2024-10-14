import { useEffect, useState } from "react"
import { getfeedbackapi } from "../apifolder/feedbackandquery"
import { Loader } from "../pages/loading"

export let Allfeedback = () => {
    let [feedback, setfeedback] = useState([])
    let [loading, setloading] = useState(false)
    let allfeedback = async () => {
        try {
            setloading(true)
            let data = await getfeedbackapi()
            setfeedback(data)
            setloading(false)
        } catch (e) {
            alert(e.message)
            setloading(false)
        }
    }
    useEffect(() => {
        allfeedback()
    }, [])
    return (
        <>
            <div className="container mt-4">
                <h2 className="text-center text-light">FEEDBACK</h2>
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>S.No</th>
                                <th>Date</th>
                                <th>Name</th>
                                <th>Contact Number</th>
                                <th>Email</th>
                                <th>FEEDBACK ID</th>
                                <th>Feedback</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                feedback.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.Date}</td>
                                        <td>{item.name}</td>
                                        <td>{item.number}</td>
                                        <td>{item.email}</td>
                                        <td>{item.id}</td>
                                        <td>{item.Content}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {loading && <Loader />}
        </>
    )
}