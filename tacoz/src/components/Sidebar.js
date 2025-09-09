import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilters, clearFilters } from '../redux/menuSlice';
import { Card, Form, Button } from 'react-bootstrap';
import './Sidebar.css'; // 👈 new css file

const Sidebar = () => {
  const dispatch = useDispatch();

  return (
    <aside className="sidebar">
      {/* Offers */}
      <Card className="sidebar-card mb-3">
        <Card.Body>
          <Card.Title>🔥 Offers</Card.Title>
          <p>20% OFF Burritos</p>
          <p>Buy 2 Quesadillas Get 1</p>
        </Card.Body>
      </Card>

      {/* Filters */}
      <Card className="sidebar-card mb-3">
        <Card.Body>
          <Card.Title>💸 Filters</Card.Title>

          {/* Min rating */}
          <Form.Group className="mb-3">
            <Form.Label>Min rating</Form.Label>
            <Form.Select
              onChange={e =>
                dispatch(
                  setFilters({ minRating: e.target.value ? Number(e.target.value) : null })
                )
              }
            >
              <option value="">Any</option>
              <option value="4">4+</option>
              <option value="4.5">4.5+</option>
            </Form.Select>
          </Form.Group>

          {/* Max delivery price */}
          <Form.Group className="mb-3">
            <Form.Label>Max delivery price</Form.Label>
            <Form.Control
              type="number"
              placeholder="e.g. 2.99"
              onChange={e =>
                dispatch(
                  setFilters({ maxDelivery: e.target.value ? Number(e.target.value) : null })
                )
              }
            />
          </Form.Group>

          {/* Platform */}
          <Form.Group className="mb-3">
            <Form.Label>Platform</Form.Label>
            <Form.Select onChange={e => dispatch(setFilters({ platform: e.target.value || null }))}>
              <option value="">Any</option>
              <option value="ubereats">Uber Eats</option>
              <option value="justeat">JustEat</option>
              <option value="deliveroo">Deliveroo</option>
            </Form.Select>
          </Form.Group>

          {/* Category */}
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select onChange={e => dispatch(setFilters({ category: e.target.value || null }))}>
              <option value="">Any</option>
              <option value="tacos">Tacos</option>
              <option value="bowls">Bowls</option>
              <option value="quesadillas">Quesadillas</option>
              <option value="enchiladas">Enchiladas</option>
              <option value="meal deals">Meal Deals</option>
              <option value="make your own">Make Your Own</option>
              <option value="specials">Specials</option>
              <option value="sides">Sides</option>
              <option value="salads">Salads</option>
              <option value="dips">Dips</option>
              <option value="desserts">Desserts</option>
              <option value="drinks">Drinks</option>
            </Form.Select>
          </Form.Group>

          <Button variant="outline-danger" size="sm" onClick={() => dispatch(clearFilters())}>
            Clear Filters
          </Button>
        </Card.Body>
      </Card>

      {/* About */}
      <Card className="sidebar-card">
        <Card.Body>
          <Card.Title>ℹ️ About</Card.Title>
          <p>Authentic Mexican flavours, fresh & fast.</p>
        </Card.Body>
      </Card>
    </aside>
  );
};

export default Sidebar;
