import React from 'react'
import { NavLink } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './index.scss'
const CustomDrawer = (props) => {
    const navigate = useNavigate()
    return (
        <div className='custom-drawer'>
            <div className='custom__drawer__wrapper'>
                <div className="sidebar-mobile">
                    <img src="/images/LOGO.svg" style={{ width: '80%', margin: '3rem auto', height: 100 }} />
                    <div className='links-mobile'>
                        <NavLink to='orders' activeClassName="active-mobile" onClick={() => {
                            props.setToggle(!props.toggle)
                            navigate('/admin/orders')
                        }}>Orders</NavLink>
                        <NavLink to='customers' activeClassName="active-mobile" onClick={() => {
                            props.setToggle(!props.toggle)
                            navigate('/admin/customers')
                        }}>Customers</NavLink>
                        <NavLink to='customers' activeClassName="active-mobile" onClick={() => {
                            localStorage.removeItem('user')
                            localStorage.removeItem('token')
                            window.location.assign("/")
                            props.setToggle(!props.toggle)
                        }}>Logout</NavLink>
                    </div>
                </div>
            </div>
            <div className='drawer-black' onClick={() => props.setToggle(!props.toggle)}>
                assd
            </div>
        </div>
    )
}

export default CustomDrawer