
import React, { useContext, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { auth } from "../firebase"


const UpdateProfile = () => {

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const { handleUpdateEmail, handleUpdatePassword, currentUser } = useAuth()

    const navigate = useNavigate()

    const emailRef = useRef()
    const passwordRef = useRef()


    const handleSubmit = (e) => {
        e.preventDefault()

        setError('')
        setSuccess('')

        let promises = []

        if(currentUser.email !== emailRef.current.value){
            promises.push(handleUpdateEmail(currentUser, emailRef.current.value))
        }

        if(passwordRef.current.value){
            promises.push(handleUpdatePassword(currentUser, passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            setSuccess('Profile Updated')
            navigate('/')
        }).catch(e => {
            setError('Unable to update profile')
            console.log(e)
        })


    }

    return (
        <div className="p-4 form-container">
            <form className="form" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <h3 className="mb-0">Update Profile</h3>
                </div>
                {error.length !== 0 && <div className="alert alert-danger mb-3" role="alert">
                    {error}
                </div>}

                {success.length !== 0 && <div className="alert alert-success mb-3" role="alert">
                    {success}
                </div>}
                <div className="mb-3 w-100">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input ref={emailRef} type="email" className="form-control" id="email" defaultValue={currentUser.email}/>
                </div>
                <div className="mb-4 w-100">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" ref={passwordRef} />
                </div>
                <div className="mb-3 w-100">
                    <button type="submit" className="btn btn-primary w-100">Update Profile</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateProfile