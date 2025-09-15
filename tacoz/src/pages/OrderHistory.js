import React, { useEffect, useState } from "react";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.email) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders?email=${user.email}`)
        .then((res) => res.json())
        .then(setOrders)
        .catch(() => setOrders([]));
    }
  }, [user]);

  return (
    <div className="order-history">
      <h2>📦 My Orders</h2>
      {orders.length === 0 ? (
        <p>No past orders yet.</p>
      ) : (
        <ul className="order-list">
          {orders.map((o) => (
            <li key={o._id} className="order-item">
              <h4>Order #{o._id}</h4>
              <p>Status: <strong>{o.status}</strong></p>
              <p>Total: €{o.total.toFixed(2)}</p>
              {o.note && <p>Note: {o.note}</p>}
              <ul className="order-products">
                {o.items.map((item, idx) => (
                  <li key={idx}>
                    {item.qty}× {item.name} (€{item.price})
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
