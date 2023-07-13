import React, { createRef, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { MdOutlineDeleteOutline, MdFileCopy } from 'react-icons/md';
import { BsPlusLg } from 'react-icons/bs';
import { Radio, Checkbox, Button, Select, Dropdown, Menu, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { DesignArea } from './design.style';

import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import { useScreenshot } from 'use-react-screenshot'
import Qr from '../../components/Qr';

const Design = ({ qrImage }) => {
  // ==================== take screen shot of qr with bg begin ============================//
  const ref = createRef(null)
  const [image, takeScreenshot] = useScreenshot()
  const getImage = () => takeScreenshot(ref.current)
  // ==================== take screen shot of qr with bg end ============================//

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dropValue, setDropValue] = useState('14 X 11');
  const [colorsValue, setColorsValue] = useState('White');
  const [colorsTitle, setColorsTitle] = useState('White');
  const [selectValue, setSelectValue] = useState(21);
  const [imgQuality, setImgQuality] = useState(true);
  const { Option } = Select;

  const array = ['14 X 11', '10 x 8 (DESK)', '16 X 12', '20 X 16', '24 X 20 (CORPORATE)'];

  const handleClick = ({ key, value }) => {
    setDropValue(key);
    console.log(key);
    console.log(value);
  };
  const handleColorsClick = (data) => {
    setColorsValue(data.colorTitle);
    setColorsTitle(data.title)
  };
  const handleChange = (value) => {
    setSelectValue(value);
    console.log(value);
  };
  const sizesMenu = (
    <Menu onClick={handleClick}>
      {array.map((item) => (
        <Menu.Item key={item}>{item}</Menu.Item>
      ))}
    </Menu>
  );
  let colorList = [
    {
      id: 1,
      colorTitle: '#fff',
      title: 'White',
    },
    {
      id: 2,
      colorTitle: '#000',
      title: 'Black',
    },
    {
      id: 3,
      colorTitle: '#ddd',
      title: 'Gray',
    },
  ]
  const colorsMenu = (
    <Menu >
      {
        colorList.map((i) => (
          <Menu.Item key={i?.title} onClick={() => handleColorsClick(i)}>{i.title}</Menu.Item>
        ))
      }
    </Menu>
  );
  const onAddingToCart = (e) => {
    e.preventDefault();

    const newItem = {
      name: `Design # ${Math.floor(Math.random() * 10000)}`,
      qrImage,
      price: 99,
      size: dropValue,
      bgColor: colorsValue
    };

    console.log(newItem);
    dispatch(addToCart(newItem));

    navigate('../cart');
  };

  return (
    <>
      <DesignArea>
        <Container>
          <Row>
            <Col lg={8}>
              <div className="gallery">
                <div className="galleryHead">
                  <h1 onClick={getImage}>CANVAS GALLERY</h1>
                  {/* <div>
                    <a href="#">Edit</a>
                    <a href="#">Preview</a>
                  </div> */}
                </div>
                <div className="galleryImage" style={{ background: '#D9EAFF' }}>
                  {/* <img src="/images/qr.svg" alt="click here" style={{ backgroundColor: colorsValue }} /> */}
                  <div style={{ background: colorsValue, padding: 30, width: 360, height: 331, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={qrImage} alt="click here" style={{ width: 158, height: 165, objectFit: 'contain' }} />
                  </div>

                  {/* <Qr color={colorsValue} /> */}
                </div>
                <div className="galleryFooter">
                  {/* <div className="galleryButtons">
                    <Button>
                      <img src="/images/undo-icon.svg" alt="click here" />
                    </Button>
                    <Button>
                      <img src="/images/redo-icon.svg" alt="click here" />
                    </Button>
                  </div> */}
                  {/* <span>Unsaved changes</span> */}
                  {/* <div className="zoomButtons">
                    <div className="galleryButtons">
                      <Button style={{ marginRight: '1rem' }}>
                        <img src="/images/hand-icon.svg" alt="click here" />
                      </Button>
                    </div>
                    <div className="zoomImage">
                      <Button
                        onClick={() => {
                          if (selectValue > 0) setSelectValue((prev) => prev - 1);
                        }}
                      >
                        -
                      </Button>
                      <Select value={`${selectValue}%`} onChange={handleChange}>
                        <Option value={20}>20%</Option>
                        <Option value={40}>40%</Option>
                        <Option value={60}>60%</Option>
                        <Option value={80}>80%</Option>
                        <Option value={100}>100%</Option>
                      </Select>
                      <Button
                        onClick={() => {
                          if (selectValue < 100) {
                            setSelectValue((prev) => prev + 1);
                          }
                        }}
                      >
                        +
                      </Button>
                    </div>
                  </div> */}
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <h5 className="productHeading">Product details</h5>
              <div className="productDetail">
                <div className="products">
                  <div className="uploadImg update__size">
                    <div className="designImage">
                      <div className="imageName">
                        <p>Size .2</p>
                        <div className='update__size__qr__icon'>
                          <img src='/images/size.png' />
                          <p>{dropValue}</p>
                        </div>
                      </div>
                      <div className="imageIcons" style={{ display: 'flex', position: 'relative' }}>
                        <Dropdown overlay={sizesMenu} trigger={['click']}>
                          <div style={{ position: 'absolute', right: 0, top: 10, transform: 'translate(-50%, -50%)', display: 'flex' }}>
                            <b>Sizes:</b>
                            <a onClick={(e) => e.preventDefault()}>
                              <Space>
                                <img src="/images/dropdown-icon.svg" alt="click here" style={{ width: 12, height: 12, objectFit: 'contain' }} />
                              </Space>
                            </a>
                          </div>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                  <h6 style={{ margin: '1rem 0' }}>Your design</h6>
                  <div className="productInfo">
                    <div className="infoHead">
                      <Dropdown overlay={colorsMenu} trigger={['click']}>
                        <div className="d-flex justify-content-between" style={{ flex: 1 }}>
                          <p className="mb-0"> {colorsTitle}</p>
                          <a onClick={(e) => e.preventDefault()}>
                            <Space>
                              <img src="/images/dropdown-icon.svg" alt="click here" />
                            </Space>
                          </a>
                        </div>
                      </Dropdown>
                    </div>
                  </div>
                </div>
                <div className="printing">
                  <span style={{ marginRight: '1rem' }}>Printing Settings:</span>
                  <Checkbox>Print on sides</Checkbox>
                </div>
                {/* <div className="uploadImg">
                  <div className="designImage">
                    <img src="/images/canvas-image.png" alt="click here" />
                    <div className="imageName">
                      <span>qr-code.png</span>
                      {imgQuality === true ? (
                        <span style={{ color: 'var(--MainColor)' }}>high resolution. (Print Quality)</span>
                      ) : (
                        <span style={{ color: '#f84a4a' }}>Low resolution (93 DPI)</span>
                      )}
                    </div>
                    <div className="imageIcons">
                      <MdFileCopy />
                      <MdOutlineDeleteOutline />
                    </div>
                  </div>
                </div> */}
                <Button className="addDesign">
                  <BsPlusLg />
                  <div>
                    <p>Add design</p>
                    <span>Print area size 4800 x 3600 px (300 DPI)</span>
                  </div>
                </Button>
              </div>
              <div className="addCart">
                <Link to="/cart" onClick={onAddingToCart}>
                  Add to Cart
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </DesignArea>
    </>
  );
};

export default Design;
