import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { moduleLogger } from '@sliit-foss/module-logger';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import SellerEmailService from '../../../../../email/seller.emails';
import EncryptionService from '../../../../../encryption/encryption.service';
import SellerRepository from '../repository/seller.repository';
import 'dotenv/config';

const logger = moduleLogger('Seller-Service');

const getTOTPSecret = () => {
  const secret = speakeasy.generateSecret({ length: 20 }).base32;
  return EncryptionService.encrypt(secret);
};

const decryptTOTPSecret = (secret) => {
  return EncryptionService.decrypt(secret);
};

const generateTOTP = (secret) => {
  return speakeasy.totp({ secret, encoding: 'base32' });
};

const generateId = async () => {
  const lastInsertedSeller = await SellerRepository.getLastInsertedSeller();
  if (lastInsertedSeller) {
    const lastId = lastInsertedSeller.id;
    const lastIdNumber = parseInt(lastId.split('-')[1]);
    return `SLR-${lastIdNumber + 1}`;
  }
  return 'SLR-1001';
};

const generateQRCode = async (secret) => {
  const otpauthURL = speakeasy.otpauthURL({
    secret,
    label: 'HerbFair',
    issuer: 'HerbFair',
    encoding: 'base32',
  });
  return await QRCode.toDataURL(otpauthURL);
};

const verifyTOTP = (secret, token) => {
  return speakeasy.totp.verify({
    secret: secret,
    encoding: 'base32',
    token: token,
    window: 10,
  });
};

const checkIfEmailExists = async (email) => {
  const seller = await SellerRepository.getSellerByEmail(email);
  if (seller) {
    return true;
  }
  return false;
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const generateToken = (seller) => {
  const payload = {
    id: seller._id,
    email: seller.email,
    permissions: seller.permissions,
  };
  return jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
};

const generateRefreshToken = (seller) => {
  const payload = {
    id: seller._id,
    email: seller.email,
    permissions: seller.permissions,
  };
  return jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

const createSeller = async (seller) => {
  if (await checkIfEmailExists(seller.email)) {
    throw new Error(`Email already exists - email: ${seller.email}`);
  }
  const id = await generateId();
  const hashedPassword = await hashPassword(seller.password);
  const secret = getTOTPSecret();
  const newSeller = {
    id,
    ...seller,
    password: hashedPassword,
    secret,
  };
  return await SellerRepository.createSeller(newSeller)
    .then(async (result) => {
      await SellerEmailService.sendWelcomeEmail(seller);
      return result;
    })
    .catch((err) => {
      logger.error(`An error occurred when inserting seller - err: ${err.message}`);
      throw err;
    });
};

const getAllSellers = async () => {
  return await SellerRepository.getAllSellers()
    .then((data) => {
      return data;
    })
    .catch((err) => {
      logger.error(`An error occurred when getting sellers - err: ${err.message}`);
      throw err;
    });
};

const getSellerById = async (id) => {
  return await SellerRepository.getSellerById(id)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      logger.error(`An error occurred when getting seller by id - err: ${err.message}`);
      throw err;
    });
};

const updateSeller = async (id, seller) => {
  const sellerToUpdate = await SellerRepository.getSellerById(id);
  if (!sellerToUpdate) {
    throw new Error(`Seller not found - id: ${id}`);
  }
  if (sellerToUpdate.email !== seller.email && (await checkIfEmailExists(seller.email))) {
    throw new Error(`Email already exists - email: ${seller.email}`);
  }
  const updatedSeller = {
    firstName: seller.firstName,
    lastName: seller.lastName,
    email: seller.email,
    addressLine1: seller.addressLine1,
    addressLine2: seller.addressLine2,
    city: seller.city,
    stateOrProvince: seller.stateOrProvince,
    postalCode: seller.postalCode,
    country: seller.country,
    phoneNumber: seller.phoneNumber,
  };
  return await SellerRepository.updateSeller(id, updatedSeller)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      logger.error(`An error occurred when updating seller by id - err: ${err.message}`);
      throw err;
    });
};

const deleteSeller = async (id) => {
  return await SellerRepository.deleteSeller(id)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      logger.error(`An error occurred when deleting seller by id - err: ${err.message}`);
      throw err;
    });
};

const sellerLogin = async (email, password) => {
  const seller = await SellerRepository.getSellerByEmail(email);
  if (!seller) {
    throw new Error('Invalid email or password');
  }
  const isMatch = await comparePassword(password, seller.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }
  const response = {
    _id: seller._id,
    id: seller.id,
    email: seller.email,
    isFirstLogin: seller.isFirstLogin,
  };
  return response;
};

const refreshToken = async (refreshToken) => {
  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
  const seller = await SellerRepository.getSellerById(decoded.id);
  if (!seller) {
    throw new Error('Invalid refresh token');
  }
  const accessToken = generateToken(seller);
  const newRefreshToken = generateRefreshToken(seller);
  const response = {
    accessToken,
    refreshToken: newRefreshToken,
  };
  return response;
};

const getTotpStatusById = async (id) => {
  const seller = await SellerRepository.getSellerById(id);
  if (seller) {
    if (seller.isFirstLogin) {
      return { isFirstTime: true };
    }
    if (seller.choosenOTPMethod === 'email') {
      SellerEmailService.sendOTP(seller, generateTOTP(decryptTOTPSecret(seller.secret)));
    }
    return { isFirstTime: false, choosenOTPMethod: seller.choosenOTPMethod };
  }
  throw new Error('Invalid seller id');
};

const verifyTOTPbyId = async (id, token) => {
  const seller = await SellerRepository.getSellerById(id);
  if (seller) {
    const verified = verifyTOTP(decryptTOTPSecret(seller.secret), token);
    if (verified) {
      const accessToken = generateToken(seller);
      const refreshToken = generateRefreshToken(seller);
      const response = {
        _id: seller._id,
        id: seller.id,
        firstName: seller.firstName,
        lastName: seller.lastName,
        email: seller.email,
        addressLine1: seller.addressLine1,
        addressLine2: seller.addressLine2,
        city: seller.city,
        stateOrProvince: seller.stateOrProvince,
        postalCode: seller.postalCode,
        country: seller.country,
        phoneNumber: seller.phoneNumber,
        isFirstLogin: seller.isFirstLogin,
        accessToken,
        refreshToken,
        isTOTPVerified: true,
      };
      await SellerEmailService.sendLoginAlert(seller);
      return response;
    }
    throw new Error('Invalid token');
  } else {
    throw new Error('Invalid seller id');
  }
};

const chooseTOTPMethod = async (id, method) => {
  const seller = {
    choosenOTPMethod: method,
    isFirstLogin: false,
  };
  return await SellerRepository.updateSeller(id, seller)
    .then(async (data) => {
      const secretDecrypted = decryptTOTPSecret(data.secret);
      if (method === 'email') {
        SellerEmailService.sendOTP(data, generateTOTP(secretDecrypted));
        return { choosenMethod: method };
      } else if (method === 'app') {
        const qrCode = await generateQRCode(secretDecrypted);
        return { qrCode: qrCode, choosenMethod: method };
      }
    })
    .catch((err) => {
      logger.error(`An error occurred when updating seller by id - err: ${err.message}`);
      throw err;
    });
};

const SellerService = {
  createSeller,
  getAllSellers,
  getSellerById,
  updateSeller,
  deleteSeller,
  sellerLogin,
  refreshToken,
  getTotpStatusById,
  verifyTOTPbyId,
  chooseTOTPMethod,
};

export default SellerService;
