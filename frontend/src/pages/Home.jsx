import { useNavigate } from "react-router-dom"

const Home = () => {
    const navigate = useNavigate();
  return (
    <div>
        <button onClick={() => {
            navigate("/adduser")
        }}>Add Customer</button>
    </div>
  )
}

export default Home