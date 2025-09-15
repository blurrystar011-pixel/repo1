import React, { useState, useEffect } from "react";
import { X, Search, Plus } from "lucide-react";
import ProductModal from "./ProductModel";
import "./SearchOverlay.css";

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setResults([]);
      setSelected(null);
    }
  }, [isOpen]);

  const handleSearch = (value) => {
    setQuery(value);

    const menuItems = JSON.parse(localStorage.getItem("menuItems")) || [];
    if (value.trim() === "") {
      setResults([]);
    } else {
      const filtered = menuItems.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      console.log("filtered", filtered);
      setResults(filtered);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="search-overlay">
      {/* Close button */}
      <button className="search-close" onClick={onClose}>
        <X size={26} />
      </button>

      {/* Search Bar */}
      <div className="search-bar">
        <Search size={20} className="search-icon" />
        <input
          type="text"
          placeholder="Search tacos, burritos, quesadillas..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          autoFocus
        />
      </div>

      {/* Results */}
     <div className="search-results">
        {results.length > 0 ? (
          results.map((item, index) => {
            const key = item.id || item._id || index;

            // ✅ Safe image check
            const imgSrc =
              item.image && item.image.startsWith("data:image")
                ? item.image
                : item.image || "/placeholder.jpg";

            // ✅ Safe price check
            const price =
              typeof item.price === "number"
                ? item.price.toFixed(2)
                : Number(item.price || 0).toFixed(2);

            return (
              <div key={key} className="search-item">
                <img
                  src={imgSrc}
                  alt={item.name || "Menu item"}
                  className="search-img"
                  onError={(e) => (e.target.src = "/placeholder.jpg")}
                />
                <div className="search-info">
                  <h4>{item.name}</h4>
                  <p className="search-price">€{price}</p>
                </div>
                <button
                  className="add-btn"
                  onClick={() => setSelected(item)}
                  title="View details"
                >
                  <Plus size={20} />
                </button>
              </div>
            );
          })
        ) : query ? (
          <p className="no-results">No items found</p>
        ) : (
          <p className="no-results">Start typing to search...</p>
        )}
      </div>

      {/* Product Modal */}
      {selected && (
        <ProductModal item={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
