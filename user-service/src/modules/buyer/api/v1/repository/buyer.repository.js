import Buyer from '../models/Buyer.model';

const createBuyer = async (buyer) => {
  try {
    const data = await Buyer.create(buyer);
    await data.save();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getBuyerById = async (id) => {
  try {
    const data = await Buyer.findById(id);
    if (!data) {
      throw new Error('Buyer not found');
    }
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getBuyerByEmail = async (email) => {
  try {
    const data = await Buyer.findOne({ email: email });
    if (!data) {
      throw new Error('Buyer not found');
    }
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateBuyer = async (id, buyer) => {
  try {
    const data = await Buyer.findByIdAndUpdate(id, buyer, { new: true });
    if (!data) {
      throw new Error('Buyer not found');
    }
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteBuyer = async (id) => {
  try {
    const data = await Buyer.findByIdAndDelete(id);
    if (!data) {
      throw new Error('Buyer not found');
    }
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getAllBuyers = async () => {
  try {
    const data = await Buyer.find();
    if (!data) {
      throw new Error('No buyers found');
    }
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const BuyerRepository = {
  createBuyer,
  getBuyerById,
  getBuyerByEmail,
  updateBuyer,
  deleteBuyer,
  getAllBuyers,
};

export default BuyerRepository;
