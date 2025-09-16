import React, { useState } from "react";
import { useSelector } from "react-redux";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const CheckoutPage = () => {
  const items = useSelector((s) => s.cart.items);
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const [step, setStep] = useState("details"); // details → otp → payment
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    note: "",
  });
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Send OTP
  const handleSendOtp = async () => {
    if (!details.email || !details.phone) {
      alert("Please enter email and phone.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/checkout/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: details.email }),
      });
      const data = await res.json();
      if (data.success) setStep("otp");
      else alert(data.message || "Failed to send OTP");
    } catch (err) {
      console.error(err);
      alert("Error sending OTP.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      alert("Please enter OTP.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/checkout/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: details.email, otp }),
      });
      const data = await res.json();
      if (data.verified) setStep("payment");
      else alert(data.message || "Invalid OTP");
    } catch (err) {
      console.error(err);
      alert("OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Checkout (Stripe)
  const handleCheckout = async () => {
    if (total < 5) {
      alert("Minimum order is £5.");
      return;
    }
    if (!otp) {
      alert("Please verify OTP first.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/checkout/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          email: details.email,
          phone: details.phone,
          address: details.address,
          note: details.note,
          name: details.name,
          address: details.address,
          otp, // pass OTP to backend
        }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert(data.message || "Checkout failed.");
    } catch (err) {
      console.error(err);
      alert("Checkout error.");
    } finally {
      setLoading(false);
    }
  };

  return <>
    <div style={{ maxWidth: 600, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Checkout</h2>

      {/* Step 1: Delivery Details */}
      {step === "details" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <h3>1️⃣ Delivery Details</h3>
          <input type="text" placeholder="Full Name" value={details.name} onChange={(e) => setDetails({ ...details, name: e.target.value })} />
          <input type="email" placeholder="Email" value={details.email} onChange={(e) => setDetails({ ...details, email: e.target.value })} />
          <input type="tel" placeholder="Phone" value={details.phone} onChange={(e) => setDetails({ ...details, phone: e.target.value })} />
          <textarea placeholder="Full Address" value={details.address} onChange={(e) => setDetails({ ...details, address: e.target.value })} />
          <textarea placeholder="Order Note (optional)" value={details.note} onChange={(e) => setDetails({ ...details, note: e.target.value })} />
          <button onClick={handleSendOtp} disabled={loading} style={{ padding: 10, backgroundColor: "#d32f2f", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </div>
      )}

      {/* Step 2: OTP Verification */}
      {step === "otp" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <h3>2️⃣ OTP Verification</h3>
          <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
          <button onClick={handleVerifyOtp} disabled={loading} style={{ padding: 10, backgroundColor: "#1976d2", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      )}

      {/* Step 3: Payment */}
      {step === "payment" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <h3>3️⃣ Payment & Summary</h3>
          <p>Total: <strong>£{total.toFixed(2)}</strong></p>
          <ul>
            {items.map((i) => (
              <li key={i.id || i._id}>{i.qty}× {i.name} (£{i.price})</li>
            ))}
          </ul>
          <button disabled={total < 5 || loading} onClick={handleCheckout} style={{ padding: 10, backgroundColor: "#388e3c", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>
            {loading ? "Processing..." : "💳 Pay Now"}
          </button>
        </div>
      )}



    </div>
       <div style={{

  margin: "auto",
  padding: 20,
  fontFamily: "'Arial', sans-serif",
}}>
  {/* Modern Info Banner */}
  <div style={{
    background: "linear-gradient(135deg, #ffe5d0 0%, #fff3e0 100%)",
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    border: "1px solid #ffd2a6",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  }}>
    <h1 style={{ color: "#d32f2f", fontSize: "28px", margin: "0 0 10px" }}>🌮 Hello Tacos!</h1>
    <p style={{ color: "#555", fontSize: "16px", lineHeight: 1.5, margin: "0 0 15px" }}>
      Bringing the authentic taste of Mexico right to your doorstep!  
      Order your favorite tacos, burritos, and more with quick delivery.  
      We are also available on <b>Deliveroo</b>, <b>UberEats</b>, and <b>JustEat</b> for your convenience.
    </p>

    {/* Images of platforms */}
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 15,
      marginBottom: 15,
      flexWrap: "wrap"
    }}>
      <img src="/images/deliveroo.png" alt="Deliveroo" style={{ height: 40 }} />
      <img src="/images/ubereats.png" alt="UberEats" style={{ height: 40 }} />
      <img src="/images/justeat.png" alt="JustEat" style={{ height: 40 }} />
    </div>

    <p style={{ color: "#777", fontSize: "14px", margin: 0 }}>
      Order directly here or through your favorite food delivery app. 🌶️🔥  
      Fast, fresh, and full of flavor!
    </p>
  </div>
</div>
  </>
};

export default CheckoutPage;
