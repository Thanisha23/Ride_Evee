import {Router} from "express"
import {addCustomer,allCustomers,findCustomer,deleteCustomer,updateCustomer} from "../controllers/customer.js"
const customerRouter = Router();

customerRouter.post("/addCustomer",addCustomer)
customerRouter.get("/allCustomers",allCustomers)
customerRouter.get("/findCustomer/:id",findCustomer)
customerRouter.delete("/deleteCustomer",deleteCustomer)
customerRouter.put("/updateCustomer",updateCustomer)

export default customerRouter
