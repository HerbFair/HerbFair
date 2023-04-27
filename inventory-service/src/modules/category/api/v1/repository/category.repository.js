import Category from '../models/Category.model';

const createCategory = async (category) => {
  try {
    const data = await Category.create(category);
    await data.save();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getCategories = async () => {
  try {
    const data = await Category.find();
    if (!data) throw new Error('No categories found');
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getCategoryById = async (id) => {
  try {
    const data = await Category.findById(id);
    if (!data) throw new Error('No categories found');
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateCategory = async (id, category) => {
  try {
    const data = await Category.findByIdAndUpdate(id, category, { new: true });
    if (!data) throw new Error('No categories found');
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteCategory = async (id) => {
  try {
    const data = await Category.findByIdAndDelete(id);
    if (!data) throw new Error('No categories found');
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const CategoryRepository = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};

export default CategoryRepository;
