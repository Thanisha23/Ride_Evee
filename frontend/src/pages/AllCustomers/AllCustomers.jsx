import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { fetchCustomers, deleteCustomer } from '../../features/customers/customersSlice.js';
import "./AllCustomers.css";

const AllCustomers = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const customers = useSelector(state => state.customers);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        dispatch(fetchCustomers());

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [dispatch]);

    const handleDelete = async (id) => {
        try {
            await dispatch(deleteCustomer(id)).unwrap();
            console.log("Customer deleted successfully");
        } catch (error) {
            console.log("Error deleting customer");
            console.error(error);
        }
    };

    if (isMobile) {
        return (
            <div className="customer-cards">
                {customers.map((customer) => (
                    <div key={customer._id} className="customer-card">
                        <h3>{customer.firstName} {customer.lastName}</h3>
                        <p><strong>ID:</strong> {customer._id}</p>
                        <p><strong>Email:</strong> {customer.email}</p>
                        <p><strong>Phone:</strong> {customer.phone}</p>
                        <p><strong>Alt Phone:</strong> {customer.alternatePhone}</p>
                        <div className="card-actions">
                            <button onClick={() => navigate("/updateCustomer", { state: customer._id })}><FaPen /> Edit</button>
                            <button onClick={() => handleDelete(customer._id)}><MdDelete /> Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="table-container">
            <table className="customer-table">
                <thead>
                    <tr>
                        <th>Customer ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Alt Phone Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer._id}>
                            <td>{customer._id}</td>
                            <td>{customer.firstName}</td>
                            <td>{customer.lastName}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.alternatePhone}</td>
                            <td>
                                <button onClick={() => navigate("/updateCustomer", { state: customer._id })}><FaPen /></button>
                                <button onClick={() => handleDelete(customer._id)}><MdDelete /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllCustomers;