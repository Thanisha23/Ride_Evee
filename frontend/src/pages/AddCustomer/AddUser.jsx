import axios from "axios";
import "./AddUser.css"
import LabelledInputType from "../../components/LabelledInputTypes/LabelledInputTypes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const AddUser = () => { 
    const navigate = useNavigate();
    const initialState = {
    firstName:"",
    lastName:"",
    email:"",
    phone:"",
    alternatePhone:""
  }

  const [postInputs,setPostInputs] = useState(initialState);
   async function addCustomer(e) {
   e.preventDefault();
        try {
          const response = await axios.post(`http://localhost:3000/api/v1/customer/addCustomer`,postInputs,{
            withCredentials:true,
            headers:{
              "Content-Type":"application/json"
            }
          })
          if(response){
            console.log(response.data);
            console.log("added user !");
            navigate("/allcustomers")
          setPostInputs(initialState);
          }
        } catch (error) {
          console.log(error);
        }
    }
 
  return (
    <div className="main">
      <div className="heading">Add customer</div>
      <form className="form">
        <div className="column">
          <LabelledInputType
            value={postInputs.firstName}
            label="Name"
            placeholder="Enter your firstName"
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                firstName: e.target.value
              });
            }}
            type="text"
          />
          <LabelledInputType
            value={postInputs.lastName}
            label="LastName"
            placeholder="Enter your lastName"
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                lastName: e.target.value
              });
            }}
            type="text"
          />
          <LabelledInputType
            value={postInputs.email}
            label="Email"
            placeholder="Enter your email"
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                email: e.target.value
              });
            }}
            type="text"
          />
      
          <LabelledInputType
            value={postInputs.phone}
            label="Phone"
            placeholder="Enter your phone"
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                phone: e.target.value
              });
            }}
            type="text"
          />
          <LabelledInputType
            value={postInputs.alternatePhone}
            label="alt-Phone"
            placeholder="Enter your alternatePhone"
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                alternatePhone: e.target.value
              });
            }}
            type="text"
          />
         </div>
       
      </form>
      <div className="button-div">
          <button onClick={addCustomer} type="submit" className="button">
            Add
          </button>
        </div>
    </div>
  )
}

export default AddUser
