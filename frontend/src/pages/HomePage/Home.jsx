import { useNavigate } from "react-router-dom"
import "./Home.css"
const Home = () => {
    const navigate = useNavigate();
  return (
    <div className="main-home">
        <button onClick={() => {
            navigate("/adduser")
        }}>Add Customer</button>
        <button onClick={() => {
          navigate("/allcustomers")
      }}>View Customers</button>
    </div>
  )
}

export default Home