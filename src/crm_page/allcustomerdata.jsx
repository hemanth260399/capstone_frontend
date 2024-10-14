import { useEffect, useState } from "react"
import "./allcustomerdata.css"
import { allcustomerapi } from "../apifolder/customerdata"
import { useNavigate } from "react-router-dom"
export let Allcustomer = () => {
    let [allcustomer, setallcustomer] = useState([])
    let navigate = useNavigate()
    let getdatacustomer = async () => {
        try {
            let data = await allcustomerapi()
            setallcustomer(data)
        } catch (e) {
            alert(e.message)
        }
    }
    let getcustomerdata = (id) => {
        navigate(`/customerdata?id=${id}`)
    }
    useEffect(() => {
        getdatacustomer()
    }, [])
    return (
        <>
            <h1 style={{ marginTop: 10, textAlign: "center" }}>CUSTOMERS DATA</h1>
            {allcustomer.map((data, index) => (
                <div className="card user-card border-success mb-3" key={index}>
                    <div className="card-header text-center ">{index + 1}</div>
                    <div className="card-body ">
                        <h5 className="card-title  text-center">{data.name}</h5>
                        <p className="card-text"><b>Email : </b>{data.email}</p>
                        <p className="card-text"><b>Contact Number : </b>{data.number}</p>
                        <p className="card-text"><b>Last purchase Date : </b>{data.date}</p>
                        <p className="card-text status"><b>status : </b>{data.active}</p>
                        <button className="btn btn-danger" onClick={() => getcustomerdata(data.id)}>View Details</button>
                    </div>
                </div>
            ))}
        </>
    )
}
// 