import "./App.css"
import AddUser from "../src/pages/AddCustomer/AddUser"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import AllCustomers from "../src/pages/AllCustomers/AllCustomers"
import UpdateCustomer from "./pages/UpdateCustomer/UpdateCustomer"
const App = () => {
  return (
    
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/adduser" element={<AddUser />} />
    <Route path="/allcustomers" element={<AllCustomers />} />
    <Route path="/updateCustomer" element={<UpdateCustomer />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App