import React from 'react'
import ReactPaginate from "react-paginate";
import { BsChevronLeft, BsChevronRight, BsFillEyeFill } from 'react-icons/bs'
import { FiEdit } from 'react-icons/fi'
import './table.scss'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import CustomModal from '../../../components/CustomModal/CustomModal';
import { gerOrders, updateOrderStatus } from '../../../hooks/requests';
const DataTable = (props) => {
    let data = props.data

    let colums = props.colums
    const [singleInfo, setSingleInfo] = useState([])
    const [search, setSearch] = useState('');
    const [updateOrderId, setUpdateOrderId] = useState('');
    const [loading, setLoading] = useState(false);



    // =======================GET Single order begin ================================//
    const getSingleOrderInfo = async (item) => {
        await setSingleInfo(item)
    }
    // =======================GET Single order end ================================//

    // =======================update order status begin ================================//

    const updateOrder = async (item) => {
        setLoading(true)
        let res = await updateOrderStatus(updateOrderId, item)
        if (res) {
            setLoading(false)
        }

    }
    // =======================update order status end ================================//

    // pagination
    const [pageNumber, setPageNumber] = useState(0);
    console.log('pageNumber', pageNumber)

    const usersPerPage = 8;
    const pagesVisited = pageNumber * usersPerPage;

    const pageCount = Math.ceil(data?.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    return (
        <>
            <div class="modal fade" id="exampleModalupdate" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Update Order Status</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div className='status-update-body'>
                                <li onClick={() => updateOrder('deliverd')} style={{ cursor: 'pointer' }}>{loading ? 'Please wait...' : 'deliverd'}</li>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CustomModal data={singleInfo} />
            <div style={{ width: 200 }}>
                <div className='form-group'>
                    <input onChange={(e) => setSearch(e.target.value)} placeholder='Search...' className='form-control' />
                </div>
            </div>
            <div>
                <table class="table my-table">
                    <thead>
                        <tr>
                            {
                                colums?.map((c) => (
                                    <th scope="col">{c.title}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    {
                        data[0]?.customer
                            ?
                            <tbody>
                                {
                                    data?.filter((value) => {
                                        if (search == "") {
                                            return value;
                                        } else if (
                                            value?.customer?.firstName.toLowerCase().includes(search.toLowerCase())
                                        ) {
                                            console.log('value', value)
                                            return value;
                                        }
                                    })?.slice(pagesVisited, pagesVisited + usersPerPage)?.map((i) => (
                                        <tr>
                                            {
                                                i.orderID
                                                    ?
                                                    <>
                                                        <th scope="row" key={i._id}>{i.orderID}</th>
                                                        <td>{i.amount}</td>
                                                        <td>{i.status}<FiEdit style={{ marginLeft: 10, cursor: 'pointer' }} data-toggle="modal" data-target="#exampleModalupdate" onClick={() => setUpdateOrderId(i._id)} /></td>
                                                        <td>{i.size}<FiEdit style={{ marginLeft: 10, cursor: 'pointer' }} data-toggle="modal" data-target="#exampleModalupdate" onClick={() => setUpdateOrderId(i._id)} /></td>
                                                        <td>{i.customer?.firstName}</td>
                                                        <td className='text-center' data-toggle="modal" data-target="#exampleModal" onClick={() => getSingleOrderInfo(i)}><BsFillEyeFill size={20} role="button" /></td>
                                                    </>
                                                    :
                                                    <>
                                                        <td>{i.firstName}</td>
                                                        <td>{i.email}</td>
                                                        <td>{i.phone}</td>
                                                        <td>{i.address}</td>
                                                        <td>{i.country}</td>
                                                        <td>{i.orders}</td>
                                                        <td>{i.state}</td>

                                                    </>
                                            }
                                        </tr>
                                    ))
                                }
                            </tbody>
                            :
                            <tbody>
                                {
                                    data?.filter((value) => {
                                        if (search == "") {
                                            return value;
                                        } else if (
                                            value?.customer?.firstName ? value?.customer?.firstName : value?.firstName.toLowerCase().includes(search.toLowerCase())
                                        ) {
                                            console.log('value', value)
                                            return value;
                                        }
                                    })?.slice(pagesVisited, pagesVisited + usersPerPage)?.map((i) => (
                                        <tr>
                                            {
                                                i.orderID
                                                    ?
                                                    <>
                                                        <th scope="row" key={i._id}>{i.orderID}</th>
                                                        <td>{i.amount}</td>
                                                        <td>{i.status}<FiEdit style={{ marginLeft: 10, cursor: 'pointer' }} data-toggle="modal" data-target="#exampleModalupdate" onClick={() => setUpdateOrderId(i._id)} /></td>
                                                        <td>{i.customer?.firstName}</td>
                                                        <td className='text-center' data-toggle="modal" data-target="#exampleModal" onClick={() => getSingleOrderInfo(i)}><BsFillEyeFill size={20} role="button" /></td>
                                                    </>
                                                    :
                                                    <>
                                                        <td>{i.firstName}</td>
                                                        <td>{i.email}</td>
                                                        <td>{i.phone}</td>
                                                        <td>{i.address}</td>
                                                        <td>{i.country}</td>
                                                        <td>{i.orders}</td>
                                                        <td>{i.state}</td>

                                                    </>
                                            }
                                        </tr>
                                    ))
                                }
                            </tbody>
                    }
                </table>
                <div className="pagination-button">
                    <ReactPaginate
                        previousLabel={<BsChevronLeft />}
                        nextLabel={<BsChevronRight />}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttn"}
                        nextLinkClassName={"nextBttn"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"paginationActive"}
                    />
                </div>
            </div>
        </>
    )
}

export default DataTable