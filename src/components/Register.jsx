import React, { useContext, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { auth } from "../firebase"


const Register = () => {

    const [error, setError] = useState('')
    const { signup } = useAuth()
    const navigate = useNavigate()

    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()


    const handleSubmit = async (e) => {
        e.preventDefault()

        setError('')

        if (passwordRef.current.value === confirmPasswordRef.current.value) {
            try {
                setError("")
                await signup(auth, emailRef.current.value, passwordRef.current.value)
                navigate('/')
            }catch(e) {
                setError('Failed to create an account')
                console.log(e)
            }
        } else {
            setError(`Passwords don't match`)
        }
    }

    return (
        <div className="p-4 form-container">
            <form className="form" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <h3 className="mb-0">Register</h3>
                </div>
                {error.length !== 0 && <div className="alert alert-danger mb-3" role="alert">
                    {error}
                </div>}
                <div className="mb-3 w-100">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input ref={emailRef} type="email" className="form-control" id="email" />
                </div>
                <div className="mb-4 w-100">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" ref={passwordRef} />
                </div>
                <div className="mb-4 w-100">
                    <label htmlFor="confirm-password" className="form-label">Password Confirmation</label>
                    <input type="password" className="form-control" id="confirm-password" ref={confirmPasswordRef} />
                </div>
                <div className="mb-3 w-100">
                    <button type="submit" className="btn btn-primary w-100">Register</button>
                </div>

                <div className="mb-3 d-flex">
                    <p className="mb-0 text-muted me-1">Already have an account ?</p>
                    <Link to="/" className="mb-0 pointer text-primary">Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Register