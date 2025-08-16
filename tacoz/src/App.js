import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MexicanFoodHero from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Menu } from "./pages/Menu";
import { FacebookProvider } from "react-facebook";
import  Navbar1  from "./components/Navbar";

function App() {
  const FACEBOOK_APP_ID = "1122436013029840"; // 👈 Your Facebook App ID

  return (
    <FacebookProvider appId={FACEBOOK_APP_ID}>
      <Router>
        {/* Header always visible */}
           <Navbar1></Navbar1>
        <MexicanFoodHero />
     

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>

        {/* Global Login Popup (shown automatically on visit) */}
        <Login />
      </Router>
    </FacebookProvider>
  );
}

export default App;