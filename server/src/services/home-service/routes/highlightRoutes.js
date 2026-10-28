
const express = require('express');
const Highlight = require('../models/Highlight');

const router = express.Router();

// GET all active highlights
router.get('/', async (req, res) => {
  try {
    const highlights = await Highlight.find({ isActive: true })
      .sort({ displayOrder: 1 });

    res.status(200).json({
      success: true,
      count: highlights.length,
      data: highlights,
    });
  } catch (error) {
    console.error('Error fetching highlights:', error.message);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch highlights',
    });
  }
});

// GET one highlight by ID
router.get('/:id', async (req, res) => {
  try {
    const highlight = await Highlight.findById(req.params.id);

    if (!highlight) {
      return res.status(404).json({
        success: false,
        message: 'Highlight not found',
      });
    }

    res.status(200).json({
      success: true,
      data: highlight,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch highlight',
    });
  }
});

module.exports = router;

