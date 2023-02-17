import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";


const Dashboard = () => {

    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logout(auth)
            navigate('/login')
        }catch(e) {
            console.log(e)
        }
    }

    return (
        <div>
            <div className="nav w-100 px-1 py-3 mb-4">
                <div className="container d-flex justify-content-center align-items-center">
                    <h3 className="logo mb-0">AUTH REACT</h3>
                </div>
            </div>

            <div className="main container m-auto d-flex justify-content-center py-4">
                <div className="content">
                    {currentUser && <div className="bg-light py-2 px-4 rounded d-flex mb-3">
                        <p className="mb-0">Email - </p>
                        <p className="mb-0 ms-2">{currentUser.email}</p>
                    </div>}
                    <button className="btn btn-danger w-100 mb-3" onClick={handleLogout}>
                        Logout
                    </button>
                    <Link to="/update-profile" className="btn btn-secondary w-100 mb-3">Update Profile</Link>
                </div>

            </div>
        </div>
    )
}

export default Dashboard;