import React from 'react';
import { OrderArea, OrderImage, OrderText } from './order.style';
import './order.scss';
import Lottie from 'react-lottie';
import animationData from '../../lotties/done-blue';
import { useEffect } from 'react';
import { trackOrder } from '../../hooks/requests';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const Order = () => {
  let { id } = useParams()
  let [data, setData] = useState([])
  console.log('data', data)
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  useEffect(() => {
    let getOrderStatus = async () => {
      let res = await trackOrder(id)
      if (res) {
        setData(res)
      }
    }
    getOrderStatus()
  }, [])

  return (
    <>
      <OrderArea>
        {/* <OrderImage src="/images/design-image.svg" alt="click here" /> */}
        {
          data.status == 'paid'
            ?
            <>
              <Lottie options={defaultOptions} height={400} width={400} />
              <OrderText>Your order has been placed successfully.</OrderText>
              <div className="order-details">
                <div className="order">Your order # {data?.orderID}</div>
                <div className="order">Payment Status {data?.status}</div>
                {/* <div className="payment">Payment ID # X12345X1X8XX</div> */}
              </div>
            </>
            :
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyItems: 'center', width: '100%', height: 200 }}>
              <OrderText style={{ textAlign: 'center', width: '100%' }}>Your Payment is pending .</OrderText>
            </div>

        }
      </OrderArea>
    </>
  );
};

export default Order;
