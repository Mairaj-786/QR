import axios from "axios";

// const API_URL = 'http://localhost:3001';
const API_URL = 'https://backendqrprint.teknovation.io/';
let token = localStorage.getItem('token')

const config = {
  headers: {
    'x-auth-token': token
  }
}

export const generateQR = async (data, setLoading) => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }
  setLoading(true)
  try {
    let res = await axios.post(`${API_URL}api/v1/qrcode/generate`, data, config)
    console.log('res', res)
    setLoading(false)
    return res.data
  } catch (error) {
    setLoading(false)
    console.log({ error })

  }
  // const sendQR = await fetch(`${API_URL}api/v1/qrcode/generate`, {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(data),
  // });

  // const response = await sendQR.json();
  // return response;
};

export const createOrder = async (data) => {
  console.log('create order', data)
  try {
    let res = await axios.post(`${API_URL}api/v1/order`, data)
    console.log('data', res)
    if (res.data) {
      window.location.assign(res.data?.stripeURL)
    }
  } catch (error) {
    console.log({ error })
  }
};

export const trackOrder = async (id) => {
  try {
    let res = await axios.get(`${API_URL}api/v1/order/${id}`)
    return res.data
  } catch (error) {
    console.log({ error })
  }
};

export const gerOrders = async () => {
  try {
    let res = await axios.get(`${API_URL}api/v1/order/`, config)
    return res.data
  } catch (error) {
    console.log({ error })
  }
};
export const gerCustomers = async () => {
  try {
    let res = await axios.get(`${API_URL}api/v1/customer/get/all`, config)
    return res.data
  } catch (error) {
    console.log({ error })
  }
};

export const updateOrderStatus = async (id, data) => {
  let myData = { status: data }
  try {
    let res = await axios.patch(`${API_URL}api/v1/order/editOrderStatus/${id}`, myData, config)
    console.log(res, 'aas')
    window.location.assign("/admin/orders")
    return res.data
  } catch (error) {
    console.log({ error })
  }
};

export const doLogin = async (data) => {
  try {
    let res = await axios.post(`${API_URL}api/v1/user/login`, data)
    console.log('login', res.data)
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('user', JSON.stringify(res.data.user))
    window.location.assign("/admin/orders")
    return res.data
  } catch (error) {
    return error
    console.log({ error })
  }
};


