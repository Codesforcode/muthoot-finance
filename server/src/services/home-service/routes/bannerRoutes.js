
const express = require('express');
const Banner = require('../models/Banner');

const router = express.Router();

// GET /api/banners
router.get('/', async (req, res) => {
  try {
    const banners = await Banner.find({ isActive: true })
      .sort({ displayOrder: 1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: banners.length,
      data: banners,
    });
  } catch (error) {
    console.error('Fetch banners failed:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to fetch banners',
    });
  }
});

// GET /api/banners/:id
router.get('/:id', async (req, res) => {
  try {
    if (!/^[a-f\d]{24}$/i.test(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid banner ID',
      });
    }

    const banner = await Banner.findOne({
      _id: req.params.id,
      isActive: true,
    }).lean();

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: 'Banner not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: banner,
    });
  } catch (error) {
    console.error('Fetch banner failed:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to fetch banner',
    });
  }
});

module.exports = router;

