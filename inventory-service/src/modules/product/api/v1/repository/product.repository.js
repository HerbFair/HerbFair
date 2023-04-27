import Product from '../models/Product.model';

const createProduct = async (product) => {
  try {
    const data = await Product.create(product);
    await data.save();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getProducts = async () => {
  try {
    const data = await Product.find();
    if (!data) throw new Error('No products found');
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getProductById = async (id) => {
  try {
    const data = await Product.findById(id);
    if (!data) throw new Error('No products found');
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateProduct = async (id, product) => {
  try {
    const data = await Product.findByIdAndUpdate(id, product, { new: true });
    if (!data) throw new Error('No products found');
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteProduct = async (id) => {
  try {
    const data = await Product.findByIdAndDelete(id);
    if (!data) throw new Error('No products found');
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const ProductRepository = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};

export default ProductRepository;
