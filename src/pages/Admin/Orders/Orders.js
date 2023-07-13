import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { gerOrders } from '../../../hooks/requests'
import '../dashboard.scss'
import DataTable from '../DataTable/DataTable'



const Orders = () => {

    const [data, setData] = useState([])
    console.log(data)
    useEffect(() => {
        const getData = async () => {
            let res = await gerOrders()
            if (res) {
                setData(res)
            }
        }
        getData()
    }, [])






    let colums = [
        {
            title: 'OrderID'
        },
        {
            title: 'Amount'
        },
        {
            title: 'Status'
        },
        {
            title: 'Size'
        },
        {
            title: 'Name'
        },
        {
            title: 'Details'
        },
    ]

    return (
        <div className='order-content'>
            <h2 className='mb-5'>Current Orders</h2>
            <DataTable data={data} colums={colums} />
        </div>
    )
}

export default Orders