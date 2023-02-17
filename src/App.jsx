import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './pages/dashboard'
import { AuthProvider } from './context/AuthContext'
import PrivateRoutes from './protected/PrivateRoutes'
import UpdateProfile from './pages/UpdateProfile'


function App() {

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route element={<PrivateRoutes />}>
            <Route exact path='/' element={<Dashboard />}/>
            <Route path="/update-profile" element={<UpdateProfile />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
