import { useEffect, useState } from 'react';
import {
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    BarChart,
    Bar
} from 'recharts';
import { dashboardapi } from '../apifolder/customerdata';
import { useNavigate } from 'react-router-dom';

export const Dashboardpage = () => {
    let navigate = useNavigate()
    const [customers, setCustomers] = useState([]);
    const [graphData, setGraphData] = useState([]);
    const [communicationData, setCommunicationData] = useState([]);
    const [communicationGraphData, setCommunicationGraphData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let data = await dashboardapi()
            setCommunicationData(data.communication)
            setCustomers(data.customer);
            prepareGraphData(data.customer);
            prepareCommunicationGraphData(data.communication);
        };
        fetchData();
    }, []);

    const prepareGraphData = (data) => {
        const monthlyData = {};
        data.forEach(customer => {
            const month = new Date(customer.created_date).toLocaleString('default', { month: 'long', year: 'numeric' });
            monthlyData[month] = (monthlyData[month] || 0) + customer.purchase_value;
        });
        setGraphData(Object.entries(monthlyData).map(([name, totalValue]) => ({ name, totalValue })));
    };

    const prepareCommunicationGraphData = (data) => {
        const methodCounts = {};
        data.forEach(communication => {
            const method = communication.communicationMethod;
            methodCounts[method] = (methodCounts[method] || 0) + 1;
        });

        setCommunicationGraphData(Object.entries(methodCounts).map(([name, count]) => ({ name, count })));
    };

    return (
        <div className="container mt-1">
            <h1 className="text-center  mb-4">Customer Dashboard</h1>
            <div className="row">
                <div className="col-lg-6 col-md-12 bg-light ">
                    <h2 className="mb-4 text-dark">Purchase Value Over Time</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={graphData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="totalValue" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="col-lg-6 col-md-12 bg-light">
                    <h2 className="mb-4 text-dark">Communications by Method</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={communicationGraphData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <h2 className="mb-4 mt-3 text-dark">Customer Details</h2>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Purchase Value</th>
                                    <th>customer Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map(customer => (
                                    <tr key={customer.id}>
                                        <td>{customer.id}</td>
                                        <td>{customer.name}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.purchase_value}</td>
                                        <td><button className='btn' onClick={() => { navigate(`/customerdata?id=${customer.id}`) }}>View Details</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
