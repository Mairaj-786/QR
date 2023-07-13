import React from 'react'
import { IoMdClose } from 'react-icons/io'
import './custom-modal.scss'
const CustomModal = (props) => {
    let data = props.data

    return (
        <div>

            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">{data.orderID}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                {/* <span aria-hidden="true">&times;</span> */}
                                <IoMdClose />
                            </button>
                        </div>
                        <div class="modal-body">
                            <div className='row'>
                                {
                                    data?.qrImageLink?.map((c, index) => (
                                        <div className='col-lg-3 col-6'>
                                            <div className='qr-image' key={index} style={{ backgroundImage: index == 0 ? data?.color[0] : data?.color[1] }}>
                                                <div className='qr-image-wrapper'>
                                                    <img src={c} />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='qr-details'>
                                <li>
                                    <b>Name:</b>
                                    <span>{data?.customer?.firstName}</span>
                                </li>
                                <li>
                                    <b>Email:</b>
                                    <span>{data?.customer?.email}</span>
                                </li>
                                <li>
                                    <b>Country:</b>
                                    <span>{data?.customer?.country}</span>
                                </li>
                                <li>
                                    <b>City:</b>
                                    <span>{data?.customer?.city}</span>
                                </li>
                                <li>
                                    <b>Address:</b>
                                    <span>{data?.customer?.address}</span>
                                </li>
                                {
                                    data?.status == 'paid'
                                        ?
                                        <>
                                            <li>
                                                <b>Orders:</b>
                                                <span>{data?.customer?.orders}</span>
                                            </li>
                                            <li>
                                                <b>Spent:</b>
                                                <span>${data?.customer?.spent}</span>
                                            </li>
                                        </>
                                        :
                                        <li>
                                            <b>Status:</b>
                                            <span>{data?.status}</span>
                                        </li>

                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomModal