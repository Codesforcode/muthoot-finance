const express = require('express');
const Service = require('../models/service');

const router = express.Router();

// GET /api/services
router.get('/', async (req, res) => {
try {
const services = await Service.find({ isActive: true })
.sort({ displayOrder: 1, name: 1 })
.lean();


res.status(200).json({
  success: true,
  count: services.length,
  data: services,
});


} catch (error) {
console.error('Fetch services failed:', error);


res.status(500).json({
  success: false,
  message: 'Unable to fetch services',
});


}
});

// GET /api/services/:slug
router.get('/:slug', async (req, res) => {
try {
const service = await Service.findOne({
slug: req.params.slug,
isActive: true,
}).lean();



if (!service) {
  return res.status(404).json({
    success: false,
    message: 'Service not found',
  });
}

return res.status(200).json({
  success: true,
  data: service,
});


} catch (error) {
console.error('Fetch service failed:', error);


return res.status(500).json({
  success: false,
  message: 'Unable to fetch service',
});


}
});

module.exports = router;
