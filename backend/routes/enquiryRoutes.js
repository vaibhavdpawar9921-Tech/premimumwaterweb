const express = require('express');
const router = express.Router();
const {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry,
} = require('../controllers/enquiryController');

// /api/enquiries
router.route('/').get(getEnquiries).post(createEnquiry);

// /api/enquiries/:id
router.route('/:id').get(getEnquiryById).delete(deleteEnquiry);

// /api/enquiries/:id/status
router.route('/:id/status').patch(updateEnquiryStatus);

module.exports = router;
