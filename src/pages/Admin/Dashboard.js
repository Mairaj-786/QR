import React from 'react'
import './dashboard.scss';
import { Layout } from 'antd';
import { NavLink, Route, Routes } from 'react-router-dom';
import Orders from './Orders/Orders';
import Customers from './Customers/Customers';
import { Button, Drawer } from 'antd';

import { GiHamburgerMenu } from 'react-icons/gi'
import CustomDrawer from './Orders/CustomDrawer/CustomDrawer';
import { useState } from 'react';
const { Header, Footer, Sider, Content } = Layout;

const Dashboard = () => {
    const [toggle, setToggle] = useState(false)
    return (
        <Layout style={{ height: '100vh' }}>
            {
                toggle
                &&
                <CustomDrawer setToggle={setToggle} toggle={toggle} />
            }
            <Sider width={300} className="sidebar">
                <img src="/images/LOGO.svg" />
                <div className='links'>
                    <NavLink to='orders' activeClassName="active">Orders</NavLink>
                    <NavLink to='customers' activeClassName="active">Customers</NavLink>
                    <NavLink to='customersas' style={{ margin: '30px 0', fontWeight: 'bold' }}
                        onClick={() => {
                            localStorage.removeItem('user')
                            localStorage.removeItem('token')
                            window.location.assign("/")
                        }}>Logout</NavLink>
                </div>
            </Sider>
            <Layout style={{ backgroundColor: '#fff' }}>
                <Content className='dash-content'>
                    <div className='ham'>
                        <GiHamburgerMenu size={20} onClick={() => setToggle(!toggle)} />
                    </div>
                    <Routes>
                        <Route path="orders" element={<Orders />} />
                        <Route path="customers" element={<Customers />} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    )
}

export default Dashboard

