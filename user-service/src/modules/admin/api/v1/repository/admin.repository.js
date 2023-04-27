import Admin from '../models/Admin.model';

const createAdmin = async (Admin) => {
  try {
    const data = await Admin.create(Admin);
    await data.save();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getAdminById = async (id) => {
  try {
    const data = await Admin.findById(id);
    if (!data) {
      throw new Error('Admin not found');
    }
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getAdminByEmail = async (email) => {
  try {
    const data = await Admin.findOne({ email: email });
    if (!data) {
      throw new Error('Admin not found');
    }
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateAdmin = async (id, admin) => {
  try {
    const data = await Admin.findByIdAndUpdate(id, admin, { new: true });
    if (!data) {
      throw new Error('Admin not found');
    }
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteAdmin = async (id) => {
  try {
    const data = await Admin.findByIdAndDelete(id);
    if (!data) {
      throw new Error('Admin not found');
    }
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getAllAdmins = async () => {
  try {
    const data = await Admin.find();
    if (!data) {
      throw new Error('No Admins found');
    }
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const AdminRepository = {
  createAdmin,
  getAdminById,
  getAdminByEmail,
  updateAdmin,
  deleteAdmin,
  getAllAdmins,
};

export default AdminRepository;
