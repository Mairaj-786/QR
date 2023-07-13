import React, { useEffect, useState } from "react";
import { Button, Input, Form, Modal } from "antd";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CartArea } from "./cart.style";
import { createOrder } from "../../hooks/requests";
import { loadStripe } from "@stripe/stripe-js";

import {
  CardElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { useSelector } from "react-redux";
import PaymentForm from "../../components/PaymentForm";

const Shipping = 10;

const Items = [
  {
    name: "Design # 1",
    image: "/images/qr-code-scanner.svg",
    price: 99,
  },
  {
    name: "Design # 2",
    image: "/images/qr-code-scanner.svg",
    price: 89,
  },
];

const Cart = (qrImage) => {
  const cartItems = useSelector((state) => state.cart);
  let subtotal = cartItems.length * 99
  let total = cartItems.length * 99 + 10
  const qrImages = cartItems.map((item) => item.qrImage);
  const color = cartItems.map((item) => item.bgColor);

  const [amount, setAmount] = useState(total);
  const [orderItems, setOrderItems] = useState({});

  // Stripe Modal
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const stripe = useStripe();
  const elements = useElements();

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const onPlacingOrder = async (values) => {
    // const item = {
    //   price: "price_1LdxBVLwxaQeH6Swvi7otcJz",
    //   quantity: 1,
    // };

    let paymentId = await stripe.elements()["_id"]
    let status = 'completed'

    const orderItemList = {
      ...values,
      paymentId,
      status,
      size: cartItems[0]?.size,
      amount: `${amount}`,
      qrImageLink: qrImages,
      color: color
    };
    await createOrder(orderItemList);

    let stripePromise;

  };

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);
    const result1 = await stripe.createToken(card);

    console.log("Result1 : ", result1.token.card.id);

    setOrderItems((prev) => {
      return {
        ...prev,
        paymentId: result1.token.card.id,
        status: "completed",
      };
    });

    return;

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/order",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };



  return (
    <>
      <Modal
        title="Card Details"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <form onSubmit={handleSubmit}>
          <CardElement />
          {/* <PaymentElement /> */}
          <button disabled={!stripe}>Submit</button>
        </form>
      </Modal>
      <CartArea>
        <Container>
          <Form
            name="cart"
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
            onFinish={onPlacingOrder}
          >
            <Row>
              <Col lg={8}>
                <div className="payMethods">
                  <h2>Pay with</h2>
                  {/* <div className="payButtons">
                    <a href="#">
                      <img src="/images/shop-pay.png" alt="click here" />
                    </a>
                    <a href="#">
                      <img src="/images/pay-pal.png" alt="click here" />
                    </a>
                    <a href="#">
                      <img src="/images/google-pay.png" alt="click here" />
                    </a>
                  </div> */}
                </div>
                <div className="contactInfo">
                  <Row>
                    <Col md={12}>
                      <h4 style={{ marginBottom: "0" }}>Contact Information</h4>
                      <Form.Item
                        label=""
                        name="email"
                        rules={[
                          {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                          },
                          {
                            required: true,
                            message: 'Please input your E-mail!',
                          },
                        ]}
                      >

                        <Input placeholder="Email" />
                      </Form.Item>
                    </Col>
                    <h4 style={{ margin: "0.5rem 0 0" }}>Shipping Address</h4>
                    <Col md={6}>
                      <Form.Item
                        label=""
                        name="firstName"
                        rules={[
                          {
                            required: true,
                            message: "Please input first name!",
                          },
                        ]}
                      >
                        <Input placeholder="First Name" />
                      </Form.Item>
                    </Col>
                    <Col md={6}>
                      <Form.Item
                        label=""
                        name="lastName"
                        rules={[
                          {
                            required: true,
                            message: "Please input last name!",
                          },
                        ]}
                      >
                        <Input placeholder="Last Name" />
                      </Form.Item>
                    </Col>
                    <Col md={12}>
                      <Form.Item
                        label=""
                        name="address"
                        rules={[
                          {
                            required: true,
                            message: "Please input Address!",
                          },
                        ]}
                      >
                        <Input placeholder="Address" />
                      </Form.Item>
                    </Col>
                    <Col md={4}>
                      <Form.Item
                        label=""
                        name="country"
                        rules={[
                          {
                            required: true,
                            message: "Please input Country!",
                          },
                        ]}
                      >
                        <Input placeholder="Country/Region" />
                      </Form.Item>
                    </Col>
                    <Col md={3}>
                      <Form.Item
                        label=""
                        name="state"
                        rules={[
                          {
                            required: true,
                            message: "Please input State!",
                          },
                        ]}
                      >
                        <Input placeholder="State/Territory" />
                      </Form.Item>
                    </Col>

                    <Col md={3}>
                      <Form.Item
                        label=""
                        name="city"
                        rules={[
                          {
                            required: true,
                            message: "Please input City!",
                          },
                        ]}
                      >
                        <Input placeholder="City" />
                      </Form.Item>
                    </Col>

                    <Col md={2}>
                      <Form.Item
                        label=""
                        name="zipCode"
                        rules={[
                          {
                            required: true,
                            message: "Please input Zip Code!",
                          },
                        ]}
                      >
                        <Input placeholder="Postcode" type="number" />
                      </Form.Item>
                    </Col>
                    <Col md={12}>
                      <Form.Item
                        label=""
                        name="phone"
                        rules={[
                          {
                            required: true,
                            message: "Please input Phone number!",
                          },
                        ]}
                      >
                        <Input placeholder="Phone" type="number" />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col lg={4}>
                <div className="results">
                  <div className="designs">
                    {cartItems.map((item) => (
                      <div className="designContent" key={item.name}>
                        <div style={{ background: item.bgColor, width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 10px' }}>
                          <img style={{ width: 49, height: 49, objectFit: 'contain' }} src={item.qrImage} alt="click here" />
                        </div>
                        <span>{item.name}</span>
                        <span>$ {item.price}</span>
                      </div>
                    ))}
                  </div>
                  {/* <div className="discount">
                    <Input placeholder="Gift card or discount code" />
                    <Button>Apply</Button>
                  </div> */}
                  <div className="subTotal mt-2">
                    <span>Subtotal</span>
                    <span>$ {subtotal}</span>
                  </div>
                  <div className="shipping">
                    <span>Shipping</span>
                    <span>$ {Shipping}</span>
                  </div>
                  <div className="total">
                    <div>
                      <h6>Total</h6>
                      <Form.Item
                        className="mb-0"
                        label=""
                        name="amount"
                        rules={[
                          {
                            // required: true,
                          },
                        ]}
                      >
                        <p>${amount}</p>
                      </Form.Item>
                    </div>
                    {/* <span>including $ 18.18 in taxes</span> */}
                  </div>
                </div>
              </Col>
              <Col lg={8}>
                <div className="order">
                  {/* <Link to="/design">Return to cart</Link> */}
                  {/* <Link to="/order"> */}

                  <Button htmlType="submit">Place Order</Button>
                  {/* </Link> */}
                </div>
              </Col>
            </Row>
          </Form>
        </Container>
      </CartArea>
    </>
  );
};

export default Cart;
