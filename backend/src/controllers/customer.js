import zod from "zod";
import { Customer } from "../db/index.js";


const customerInfoBody = zod.object({
    firstName:zod.string(),
    lastName:zod.string(),
    email:zod.string().email(),
    phone:zod.string(),
    alternatePhone:zod.string()
})


export const addCustomer = async(req,res) => {
    const {success} = customerInfoBody.safeParse(req.body);
    if(!success) {
        return res.json({
            message:"Incorrect Inputs!"
        })
    }

    const existingCustomer = await Customer.findOne({
        email:req.body.email,
    });

    if(existingCustomer) {
        return res.json({
            message:"Customer with this email already exists!"
        })
    }

    const customer = await Customer.create({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        phone:req.body.phone,
        alternatePhone:req.body.alternatePhone
    });
    const customerId = customer._id;

    if(customerId){
        res.json({
            customerId,
            message:"Customer added successfully"
        })
    }else{
        res.json({
            message:"Error adding the customer"
        })
    }
}

export const allCustomers = async(req,res) => {
   try {
    const customers = await Customer.find({});

    if(customers.length === 0) {
        return res.status(404).json({
            message:"No customers found!"
        })
    }

    res.status(200).json({
        message:"Customers retrieved successfully",
        count:customers.length,
        customers
    })
   } catch (error) {
    res.status(500).json({
        message: "Error retrieving customers",
        error: error.message
    });
   }
}

export const findCustomer = async (req, res) => {
    try {
        const customerId = req.params.id;
        const customer = await Customer.findById(customerId);

        if (customer) {
            return res.status(200).json({
                customer
            });
        } else {
            return res.status(404).json({
                message: "Customer with this id doesn't exist"
            });
        }
    } catch (error) {
        console.error("Error finding the customer:", error);
        res.status(500).json({
            message: "Error finding the customer!",
            error: error.message
        });
    }
};



export const deleteCustomer = async (req, res) => {
    try {
        const customerId = req.body.id;
        const result = await Customer.findByIdAndDelete(customerId);

        if (result) {
            return res.status(200).json({
                message: "Customer deleted successfully!"
            });
        } else {
            return res.status(404).json({
                message: "Customer doesn't exist"
            });
        }
    } catch (error) {
        console.error("Error deleting customer:", error);
        return res.status(500).json({
            message: "Error deleting the customer!",
            error: error.message
        });
    }
};

export const updateCustomer = async (req, res) => {
    
        const customerId = req.body.id;
        const updateData = req.body;
        const {success} = customerInfoBody.safeParse(req.body);
        if(!success){
            return res.json({
                message:"Invalid inputs"
            })
        }
        try {
            const updatedCustomer = await Customer.findByIdAndUpdate({
                _id:customerId,
            },{
                firstName:updateData.firstName,
                lastName:updateData.lastName,
                email:updateData.email,
                phone:updateData.phone,
                alternatePhone:updateData.alternatePhone
            },{
                new:true
            });
            if(!updatedCustomer){
                return res.json({
                    message:"Customer not found!"
                })
            }
    }catch(error){
        console.log(error);
        res.status(ResponseStatus.Error).json({
            message:"Error",
        })
    }
};
