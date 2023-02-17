import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateEmail, updatePassword } from "firebase/auth";
import { auth } from "../firebase";


export const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {


    const [currentUser, setCurrentUser] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const signup = (auth, email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (auth, email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = (auth) => {
        return signOut(auth)
    }

    const handleUpdateEmail = (currentUser, email) => {
        return updateEmail(currentUser, email)
    }

    const handleUpdatePassword = (currentUser, password) => {
        return updatePassword(currentUser, password)
    }

    let value = {
        currentUser,
        signup, 
        login,
        logout,
        handleUpdateEmail,
        handleUpdatePassword
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setIsLoading(false)
            console.log(user)
        })

        return unsubscribe
    }, [])

    return(
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    )
}

