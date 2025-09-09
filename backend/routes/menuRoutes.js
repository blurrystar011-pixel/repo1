// server/routes/menuRoutes.js
const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// GET /api/menu  -> supports query filters: q, minDelivery, maxDelivery, minRating, platform
router.get('/', async (req, res) => {
  try {
    const { q, minDelivery, maxDelivery, minRating, platform, category } = req.query;
    const query = {};

    if (q) query.name = { $regex: q, $options: 'i' };
    if (category) query.category = category;
    if (minDelivery) query.deliveryPrice = { ...query.deliveryPrice, $gte: Number(minDelivery) };
    if (maxDelivery) query.deliveryPrice = { ...query.deliveryPrice, $lte: Number(maxDelivery) };
    if (minRating) query.rating = { $gte: Number(minRating) };
    if (platform) query.platform = { $in: [platform] };

    const items = await MenuItem.find(query).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch menu' });
  }
});

module.exports = router;
