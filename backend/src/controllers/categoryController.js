const categoryService = require('../services/categoryService');

/**
 * Controller: Create Category
 * Route: POST /api/v1/categories
 * Access: Private/Admin
 */
const createCategory = async (req, res, next) => {
  try {
    const category = await categoryService.createCategory(req.body);
    res.status(201).json({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

/**
 * Controller: Get All Categories
 * Route: GET /api/v1/categories
 * Access: Public
 */
const getCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    res.status(500);
    next(error);
  }
};

module.exports = {
  createCategory,
  getCategories
};
