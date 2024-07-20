import { useLocation, useNavigate } from "react-router-dom"
import LabelledInputType from "../../components/LabelledInputTypes/LabelledInputTypes";
import { useEffect, useState } from "react";
import axios from "axios";

const UpdateCustomer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const customerId = location.state;
    const [customer, setCustomer] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        alternatePhone: ""
    });

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await axios.get(`${import.meta.env.BACKEND_URL}/api/v1/customer/findCustomer/${customerId}`);
                setCustomer(response.data.customer);
            } catch (error) {
                console.error("Error fetching customer:", error);
            }
        };

        fetchCustomer();
    }, [customerId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomer(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const updateCustomer = async () => {
        try {
            const response = await axios.put(`${import.meta.env.BACKEND_URL}/api/v1/customer/updateCustomer`, {
                id: customerId,
                ...customer
            }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.data) {
                console.log("Customer updated successfully");
                navigate('/all-customers');
            }
        } catch (error) {
            console.error("Error updating customer:", error);
        }
    };

    return (
        <div className="main">
            <div className="heading">Update Customer</div>
            <form className="form">
                <div className="column">
                    <LabelledInputType
                        value={customer.firstName}
                        name="firstName"
                        label="Name"
                        placeholder="Enter your firstName"
                        onChange={handleInputChange}
                        type="text"
                    />
                    <LabelledInputType
                        value={customer.lastName}
                        name="lastName"
                        label="LastName"
                        placeholder="Enter your lastName"
                        onChange={handleInputChange}
                        type="text"
                    />
                    <LabelledInputType
                        value={customer.email}
                        name="email"
                        label="Email"
                        placeholder="Enter your email"
                        onChange={handleInputChange}
                        type="text"
                    />
                    <LabelledInputType
                        value={customer.phone}
                        name="phone"
                        label="Phone"
                        placeholder="Enter your phone"
                        onChange={handleInputChange}
                        type="text"
                    />
                    <LabelledInputType
                        value={customer.alternatePhone}
                        name="alternatePhone"
                        label="alt-Phone"
                        placeholder="Enter your alternatePhone"
                        onChange={handleInputChange}
                        type="text"
                    />
                </div>
            </form>
            <div className="button-div">
                <button onClick={updateCustomer} type="button" className="button">
                    Update
                </button>
            </div>
        </div>
    );
};

export default UpdateCustomer;