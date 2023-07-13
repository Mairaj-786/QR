import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF } from 'react-icons/fa';
import { AiOutlineInstagram } from 'react-icons/ai';
import { GrLinkedinOption } from 'react-icons/gr';
import { BsTwitter } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { FooterArea } from './footer.style';
import { Input } from 'antd';
import { Link } from 'react-router-dom';

const Footer = (props) => {
  const { Search } = Input;
  return (
    <>
      <FooterArea style={{ paddingBottom: props.pad }}>
        <div className="mainFooter">
          <Container >
            <Row className="align-items-center pt-2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', }} >
              <Col xs={3}>
                <a href="#" className="footerBrand">
                  <img src="/images/LOGO.svg" alt="click here" />
                </a>
              </Col>
              <Col xs={5} className="footerInfo ml-auto pt-4">
                <Link to="/about">About US</Link>
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/trackOrder">Where is my order</Link>
                <Col sm={5} xs={9} className="socialLinks m-auto pt-1">
                  <a href="#">
                    <FaFacebookF />
                  </a>
                  <a href="#">
                    <AiOutlineInstagram />
                  </a>
                  <a href="#">
                    <GrLinkedinOption />
                  </a>
                  <a href="#">
                    <BsTwitter />
                  </a>
                </Col>
                <Col sm={3} xs={6} style={{ width: '100%', marginTop: 5 }}>
                  <a className="infoLink" href="#">
                    <MdEmail />
                    <span>info@canvasmy.com</span>
                  </a>
                </Col>

                {/* <Link to="/contact">Contact</Link> */}
              </Col>
              {/* <Col xs={4}>
                <p style={{ marginBottom: '0' }} className="subscribe">
                  Subscribe to keep up with new products
                </p>
              </Col> */}


              {/* <Col sm={4} className="emailInput">
                <Search placeholder="Email" enterButton="Subscribe" size="large" />
              </Col> */}
            </Row>
          </Container>
        </div>
        <div className="copyRight">
          <p>Copyright @ canvasmywifi 2022.All rights reserved.</p>
        </div>
      </FooterArea>
    </>
  );
};

export default Footer;
