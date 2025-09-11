import React, { useState, useRef, useEffect } from "react";
import { Button } from "react-bootstrap";
import ProductModal from "../components/ProductModel";
import { toast } from "react-toastify";
import "./MenuMobile.css";
import menuheader from "../assets/menuheader.png";
const MenuMobile = ({ items, status }) => {
  const [selected, setSelected] = useState(null);
  const [activeCategory, setActiveCategory] = useState("");
  const categoryRefs = useRef({});
  const catBtnRefs = useRef({});

  // Mock restaurant info (replace with API data later)
  const restaurant = {
    name: "Hello Tacos - Wolverhampton City Centre",
    categories: ["Burritos", "Mexican", "Tacos"],
    opensAt: "10:15",
    minOrder: "£10.00 minimum",
    deliveryFee: "£2.50 delivery",
    coverImg:
     menuheader,
  };

  // Group items by category
  const grouped = items.reduce((acc, item) => {
    const cat = item.category || "Others";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  const categories = Object.keys(grouped);

  // IntersectionObserver → detect active category
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.dataset.category);
          }
        });
      },
      { rootMargin: "-50% 0px -40% 0px", threshold: 0 }
    );

    Object.values(categoryRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [categories]);

  // Auto-scroll category slider
  useEffect(() => {
    if (activeCategory && catBtnRefs.current[activeCategory]) {
      catBtnRefs.current[activeCategory].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeCategory]);

  const handleOrderClick = (item) => {
    setSelected(item);
    toast.success(`${item.name} ready to customize!`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  return (
    <main className="menu-mobile">
      {/* 🔥 Header section */}
      <div className="restaurant-header">
        <img src={restaurant.coverImg} alt={restaurant.name} className="header-img" />
        <div className="header-content">
          <h2 className="resto-name">{restaurant.name}</h2>
          <p className="resto-meta">
            {restaurant.categories.join(" · ")}
          </p>
          <p className="resto-meta small">
            Opens at {restaurant.opensAt} · {restaurant.minOrder} · {restaurant.deliveryFee}
          </p>
          <Button variant="outline-dark" size="sm" className="group-order-btn">
            Start group order
          </Button>
        </div>
      </div>

      {/* Sticky category slider */}
      <div className="category-slider">
        {categories.map((cat) => (
          <button
            key={cat}
            ref={(el) => (catBtnRefs.current[cat] = el)}
            className={`cat-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() =>
              categoryRefs.current[cat]?.scrollIntoView({ behavior: "smooth" })
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Popular Section */}
     <div className="popular-section">
  <h5 className="ps-3">Popular with other people</h5>
  <div className="popular-list">
    {items.slice(0, 10).map((item) => (
      <div
        key={item.id}
        className="popular-card"
        onClick={() => setSelected(item)} // open modal on click
      >
        <div className="popular-img-wrapper">
          <img src={item.image} alt={item.name} />
          {item.offer && <span className="offer-badge">{item.offer}</span>}
        </div>
        <span className="popular-name">{item.name}</span>
      </div>
    ))}
  </div>
</div>


      {/* Items by Category */}
      <div className="mobile-menu">
        {categories.map((cat) => (
          <section
            key={cat}
            ref={(el) => (categoryRefs.current[cat] = el)}
            data-category={cat}
            className="menu-category"
          >
            <h5 className="cat-heading">{cat}</h5>
            {grouped[cat].map((item) => (
              <div key={item.id} className="mobile-card">
                <img src={item.image} alt={item.name} className="mobile-img" />
                <div className="mobile-info">
                  <h6>{item.name}</h6>
                  <p className="text-muted small">{item.description}</p>
                  <div className="mobile-footer">
                    <span style={{'width':'150px'}}>€{item.price.toFixed(2)}</span>
                    <Button size="sm" onClick={() => handleOrderClick(item)}>
                      +
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </section>
        ))}
      </div>

      {selected && (
        <ProductModal item={selected} onClose={() => setSelected(null)} />
      )}
    </main>
  );
};

export default MenuMobile;
