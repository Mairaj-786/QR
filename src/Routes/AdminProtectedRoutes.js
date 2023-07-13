import { Outlet, Navigate } from 'react-router-dom'
const AdminProtectedRoutes = () => {
    let token = localStorage.getItem('token')
    return token ? <Outlet /> : <Navigate to="/" />
}

export default AdminProtectedRoutes