import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"


const PrivateRoutes = () => {

    const { currentUser } = useAuth()
    const navigate = useNavigate()

  return (
   currentUser ? <Outlet /> : <Navigate to="/login" replace />
  )
}

export default PrivateRoutes