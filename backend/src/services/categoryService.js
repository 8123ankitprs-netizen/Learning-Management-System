const Category = require('../models/Category');

/**
 * Service Layer for Category Management
 * Handles direct database operations for Course Categories.
 */

const createCategory = async (categoryData) => {
  const { name, description } = categoryData;
  const categoryExists = await Category.findOne({ name });
  if (categoryExists) {
    throw new Error('Category already exists');
  }
  return await Category.create({ name, description });
};

const getAllCategories = async () => {
  return await Category.find({});
};

module.exports = {
  createCategory,
  getAllCategories
};
