import React, { useState } from "react";
import { Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import ProductModal from "../components/ProductModel";
import { toast } from "react-toastify";

const MenuDesktop = ({ items, status }) => {
  const [selected, setSelected] = useState(null);

  const handleOrderClick = (item) => {
    setSelected(item);
    toast.success(`${item.name} ready to customize!`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: 20 }}>
        <h2 className="mb-4">Menu</h2>
        {status === "loading" && <p>Loading...</p>}

        <div
          className="d-grid"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 20,
          }}
        >
          {items.length === 0 && status !== "loading" && (
            <p>No menu items found.</p>
          )}
          {items.map((item) => (
            <Card key={item._id || item.id} className="shadow-sm border-0 h-100">
              <div style={{ height: 160, overflow: "hidden" }}>
                <Card.Img
                  variant="top"
                  src={item.image}
                  alt={item.name}
                  style={{ height: "100%", objectFit: "cover" }}
                />
              </div>
              <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <Card.Title className="fs-6 mb-0">{item.name}</Card.Title>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>{item.rating} stars</Tooltip>}
                  >
                    <span role="img" aria-label="rating">
                      ⭐ {item.rating}
                    </span>
                  </OverlayTrigger>
                </div>
                <Card.Text className="text-muted" style={{ flex: 1 }}>
                  {item.description}
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <strong>€{item.price.toFixed(2)}</strong>
                  <Button className="orderbtn" onClick={() => handleOrderClick(item)}>
                    Order Now
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </main>

      {selected && (
        <ProductModal item={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
};

export default MenuDesktop;
