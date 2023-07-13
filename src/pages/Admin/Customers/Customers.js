import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { gerCustomers } from '../../../hooks/requests'
import '../dashboard.scss'
import DataTable from '../DataTable/DataTable'


const Customers = () => {

    const [data, setData] = useState([])
    console.log('ci', data)
    useEffect(() => {
        const getData = async () => {
            let res = await gerCustomers()
            // let res = await axios.get('https://backendqrprint.teknovation.io/api/v1/customer/get/all')
            setData(res)
        }
        getData()
    }, [])

    let colums = [

        {
            title: 'Name'
        },
        {
            title: 'Email'
        },
        {
            title: 'Phone'
        },
        {
            title: 'Address'
        },
        {
            title: 'Country'
        },
        {
            title: 'Orders'
        },
        {
            title: 'State'
        },

    ]
    return (
        <div className='order-content'>
            <h2 className='mb-5'>Customers</h2>
            <DataTable data={data} colums={colums} />
        </div>
    )
}

export default Customers