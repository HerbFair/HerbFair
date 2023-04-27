import Brand from '../models/Brand.model';

const createBrand = async (brand) => {
  try {
    const data = await Brand.create(brand);
    await data.save();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getBrands = async () => {
  try {
    const data = await Brand.find();
    if (!data) throw new Error('No brands found');
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getBrandById = async (id) => {
  try {
    const data = await Brand.findById(id);
    if (!data) throw new Error('No brands found');
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateBrand = async (id, brand) => {
  try {
    const data = await Brand.findByIdAndUpdate(id, brand, { new: true });
    if (!data) throw new Error('No brands found');
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteBrand = async (id) => {
  try {
    const data = await Brand.findByIdAndDelete(id);
    if (!data) throw new Error('No brands found');
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const BrandRepository = {
  createBrand,
  getBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
};

export default BrandRepository;
