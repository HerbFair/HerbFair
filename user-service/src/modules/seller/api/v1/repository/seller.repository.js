import Seller from '../models/Seller.model';

const createSeller = async (seller) => {
  try {
    const data = await Seller.create(seller);
    await data.save();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getSellerById = async (id) => {
  try {
    const data = await Seller.findById(id);
    if (!data) {
      throw new Error('Seller not found');
    }
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getSellerByEmail = async (email) => {
  try {
    const data = await Seller.findOne({ email: email });
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateSeller = async (id, seller) => {
  try {
    const data = await Seller.findByIdAndUpdate(id, seller, { new: true });
    if (!data) {
      throw new Error('Seller not found');
    }
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteSeller = async (id) => {
  try {
    const data = await Seller.findByIdAndDelete(id);
    if (!data) {
      throw new Error('Seller not found');
    }
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getAllSellers = async () => {
  try {
    const data = await Seller.find();
    if (!data) {
      throw new Error('No sellers found');
    }
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getLastInsertedSeller = async () => {
  try {
    const data = await Seller.findOne()
      .sort({ _id: -1 })
      .limit(1);
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const SellerRepository = {
  createSeller,
  getSellerById,
  getSellerByEmail,
  updateSeller,
  deleteSeller,
  getAllSellers,
  getLastInsertedSeller,
};

export default SellerRepository;
