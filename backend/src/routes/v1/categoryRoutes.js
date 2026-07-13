const express = require('express');
const { createCategory, getCategories } = require('../../controllers/categoryController');
const { protect, authorize } = require('../../middlewares/authMiddleware');

const router = express.Router();

router.route('/')
  .get(getCategories)
  .post(protect, authorize('admin'), createCategory);

module.exports = router;
