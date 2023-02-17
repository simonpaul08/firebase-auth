import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { auth } from "../firebase"


const Login = () => {

    const [error, setError] = useState('')
    const navigate = useNavigate()


    const emailRef = useRef()
    const passRef = useRef()
    const { login } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        try {
            await login(auth, emailRef.current.value, passRef.current.value)
            navigate('/')
        } catch (e) {
            setError('Wrong Credentials !!')
        }

    }

    return (
        <div className="p-4 form-container">
            <form className="form" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <h3 className="mb-0">Login</h3>
                </div>
                {error.length !== 0 && <div className="alert alert-danger mb-3" role="alert">
                    {error}
                </div>}
                <div className="mb-3 w-100">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" ref={emailRef} required />
                </div>
                <div className="mb-4 w-100">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" ref={passRef} required />
                </div>
                <div className="mb-3 w-100">
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </div>
                <div className="mb-3 d-flex">
                    <p className="mb-0 text-muted me-1">Don't have an account ?</p>
                    <Link to="/register" className="mb-0 pointer text-primary">Register</Link>
                </div>
            </form>
        </div>
    )
}

export default Login