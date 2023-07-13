import { useState } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import GenerateQr from './pages/generateQr/GenerateQr';
import Design from './pages/design/Design';
import Cart from './pages/cart/Cart';
import Order from './pages/order/Order';
import Footer from './components/footer/Footer';
import TrackOrder from './pages/trackOrder/TrackOrder';
import Privacy from './pages/privacy/Privacy';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import AdminProtectedRoutes from './Routes/AdminProtectedRoutes';
import Dashboard from './pages/Admin/Dashboard';
import Login from './pages/Login/Login';

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<PublicRoutes />} />
          <Route element={<AdminProtectedRoutes />}>
            <Route path="/admin/*" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

const PublicRoutes = () => {
  const [qrImage, setQrImage] = useState('');
  const [qrImageBg, setQrImageBg] = useState('');
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart qrImage={qrImage} />} />
        <Route path="/design" element={<Design setQrImageBg={setQrImageBg} qrImageBg={qrImageBg} qrImage={qrImage} />} />
        <Route path="/generateQr" element={<GenerateQr setQrImage={setQrImage} />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/trackOrder" element={<TrackOrder />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  )
}