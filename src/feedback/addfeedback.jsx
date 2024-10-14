import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { addfeedbackandqueryapi } from "../apifolder/feedbackandquery"

export let Addfeedback = () => {
    let isAuthenticated = Boolean(localStorage.getItem("useremail"))
    let [feedback, setfeedback] = useState({ email: "", selecttype: "", Content: "" })
    let navigate = useNavigate()
    let datachange = (e) => {
        setfeedback({ ...feedback, [e.target.name]: e.target.value })
    }
    let submitfeedback = async (e) => {
        e.preventDefault()
        try {
            let data = await addfeedbackandqueryapi(feedback)
            alert(data.msg)
            navfeedback()
        } catch (e) {
            alert(e.message)
        }
    }
    let navfeedback = () => {
        if (isAuthenticated) {
            console.log(isAuthenticated)
            navigate("/userpage")
        } else {
            navigate("/")
        }
    }
    return (
        <>
            <div className="container mt-5">
                <h1 className="text-center">Submit Feedback or Query</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="customerId">Customer Email</label>
                        <input
                            type="email"
                            id="customerId"
                            name="email"
                            value={feedback.email}
                            onChange={datachange}
                            required
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="feedbackType">Type</label>
                        <select
                            id="feedbackType"
                            className="form-control"
                            name="selecttype"
                            value={feedback.selecttype}
                            onChange={datachange}
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="feedback">Feedback</option>
                            <option value="query">Query</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="feedback">Feedback / Query</label>
                        <textarea
                            id="feedback"
                            placeholder="Enter your feedback or query here..."
                            required
                            rows="4"
                            name="Content"
                            value={feedback.Content}
                            onChange={datachange}
                            className="form-control"
                        ></textarea>
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn btn-success mx-2" onClick={submitfeedback}>
                            Submit
                        </button>
                        <button
                            type="button"
                            onClick={navfeedback}
                            className="btn btn-secondary mx-2"
                        >
                            Home
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}