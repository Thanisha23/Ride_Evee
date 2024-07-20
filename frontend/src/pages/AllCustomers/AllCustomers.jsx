import { useEffect } from 'react';
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

    useEffect(() => {
        dispatch(fetchCustomers());
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

    return (
        <div className="table-container">
            <table className="responsive-table">
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
                            <td data-label="Customer ID">{customer._id}</td>
                            <td data-label="First Name">{customer.firstName}</td>
                            <td data-label="Last Name">{customer.lastName}</td>
                            <td data-label="Email">{customer.email}</td>
                            <td data-label="Phone Number">{customer.phone}</td>
                            <td data-label="Alt Phone Number">{customer.alternatePhone}</td>
                            <td data-label="Actions">
                                <button onClick={() => navigate("/updateCustomer", {
                                    state: customer._id
                                })}><FaPen /></button>
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