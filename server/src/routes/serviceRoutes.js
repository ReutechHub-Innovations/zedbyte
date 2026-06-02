const express = require('express');
const {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} = require('../controllers/adminController');
const { verifyAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllServices);
router.get('/:id', getServiceById);
router.post('/', verifyAdmin, createService);
router.put('/:id', verifyAdmin, updateService);
router.delete('/:id', verifyAdmin, deleteService);

module.exports = router;
