import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MexicanFoodHero from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CartPage from "./pages/Cart";
import  Menu  from "./pages/Menu";
import { FacebookProvider } from "react-facebook";
import  Navbar1  from "./components/Navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import Footer from "./components/Footer";
import CheckoutPage from "./components/CheckoutPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import OfferModal from "./components/OfferModal";
import CookieConsent from "./components/CookieConsent";
import CookiePolicy from "./pages/CookiePolicy";
function App() {
  const FACEBOOK_APP_ID = "1122436013029840"; // 👈 Your Facebook App ID

  return (
    <FacebookProvider appId={FACEBOOK_APP_ID}>
      <Router>
        {/* Header always visible */}
           <Navbar1></Navbar1>
               <OfferModal></OfferModal>
     <CookieConsent></CookieConsent>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
           <Route path="/cart" element={<CartPage />} />
           <Route path="/checkout" element={<CheckoutPage />} />
           <Route path='/privacy-policy' element={<PrivacyPolicy />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
        </Routes>

        {/* Global Login Popup (shown automatically on visit) */}
        <Login />
      </Router>
      <Footer></Footer>
       <ToastContainer position="top-right" autoClose={3000} />
    </FacebookProvider>
  );
}

export default App;