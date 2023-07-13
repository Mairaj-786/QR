import React, { useState } from 'react';
import { Form, Input, Select, Button, Spin } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { GenerateArea, GenerateLogo } from './generateQr.style';
import { generateQR } from '../../hooks/requests';

const GenerateQr = ({ setQrImage }) => {
  const [loading, setLoading] = useState(false)
  const { Option } = Select;
  const [qrCode, setQrCode] = useState(0);
  const [qr, setQr] = useState('')

  const navigate = useNavigate();

  const handleCLick = () => {
    navigate('../design');
    setQrCode(1);
    // setTimeout(() => {
    //   setQrCode(2);
    // }, 1500);
  };

  const onSubmitQRcode = async (values) => {
    const wifiCanvas = {
      ...values,
      hiddenSSID: false,
    };

    let res = await generateQR(wifiCanvas, setLoading);
    if (res?.qrCodee ? res?.qrCodee : res?.qrCode) {
      setQr(res?.qrCodee?.image ? res?.qrCodee.image : res?.qrCode.image)
      setQrCode(1);
      setTimeout(() => {
        setQrCode(2);
      }, 2500);
      // if (res.status === true) {
      setQrImage(res?.qrCodee?.image ? res?.qrCodee.image : res?.qrCode?.image);
      // navigate('../design');
      // }
    }

    console.log('qr generated', res.qrCodee.image);

  };

  const validatePassword = (rule, value, callback) => {
    if (value && value.length < 8) {
      callback('Password too small!');
    } else {
      callback();
    }
  };
  const validateType = (rule, value, callback) => {
    if (value == 0) {
      callback('Please input your network security type');
    } else {
      callback();
    }
  };

  return (
    <>
      <GenerateLogo>
        <img src="/images/LOGO.svg" alt="click here" />
      </GenerateLogo>
      <GenerateArea>
        <div className="generator">
          <p style={{ fontSize: '1.125rem' }}>Network/SSID*</p>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
            onFinish={onSubmitQRcode}
          >
            <Form.Item
              label=""
              name="ssid"
              rules={[
                {
                  required: true,
                  message: 'Please input your network SSID!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label=""
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your network password!',
                },
                { validator: validatePassword },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item
              label=""
              name="encryption"
              rules={[
                {
                  required: true,
                  message: 'Please input your network security type!',
                },
                { validator: validateType },
              ]}
            >
              <Select defaultValue="0">
                <Option value="0">Select Your Network</Option>
                <Option value="WPA/WPA2">WPA/WPA2</Option>
                <Option value="WPA">WPA</Option>
                <Option value="GSM">GSM</Option>
              </Select>
            </Form.Item>
            <div className="generateImg">{qrCode === 2 ? <img src={qr} /> : qrCode === 1 ? <Spin size="large" /> : ''}</div>
            <Form.Item className="generateQrSubmit">
              {qrCode === 2 ? (
                <Button className="generateBtn" onClick={handleCLick}>
                  {/* <Link to="/design"> */}
                  Create your WIFI Canvas
                  {/* </Link> */}
                </Button>
              ) : (
                <Button htmlType="submit" className="generateBtn">
                  {
                    loading
                      ?
                      'Please wait...'
                      :
                      'Generate QR'

                  }
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
      </GenerateArea>
    </>
  );
};

export default GenerateQr;
