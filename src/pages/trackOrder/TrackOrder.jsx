import { Button, Form, Input, Spin, Typography } from "antd";
import React from "react";
import { useState } from "react";
import { trackOrder } from "../../hooks/requests";
import { TrackArea, Tracker } from "./trackOrder.style";
const { Title } = Typography;

const TrackOrder = () => {
  const [id, setId] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  console.log('data', data)

  const handleTrackOrder = async () => {
    if (!id) {
    } else {
      setLoading(true)
      let res = await trackOrder(id)
      if (res) {
        setLoading(false)
        setData(res)
        console.log('track data', res)
      }
    }
  }
  return (
    <>
      <TrackArea>
        <Tracker>
          <h1 style={{ marginBottom: "5rem" }}>Track Order</h1>
          <p>Enter the code we send you in email and track your order.</p>
          <Form
            name="trackerForm"
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
          >
            <Form.Item
              label=""
              name="code"
              rules={[
                {
                  required: true,
                  message: "Please input your Code!",
                },
              ]}
            >
              <Input placeholder="EnterCode" onChange={(e) => setId(e.target.value)} />
            </Form.Item>
            {
              loading
                ?
                <Spin size="large" />
                :
                <Title>{data?.status}</Title>
            }
            <Form.Item>
              {/* <Button htmlType="submit" data-toggle="modal" data-target="#exampleModal">Track My Order</Button> */}
              <Button disabled={loading} htmlType="submit" onClick={handleTrackOrder}>{loading ? 'Please wait...' : 'Track My Order'}</Button>
            </Form.Item>
          </Form>
        </Tracker>
      </TrackArea>
    </>
  );
};

export default TrackOrder;
