import axios from "axios";
const BASE_URL = "http://localhost:8090/api/user-service/v1";

class SellerService {
  //Seller Login
  static sellerLogin = (email, password) => {
    let credentials = {
      email: email,
      password: password,
    };

    return axios.post(`${BASE_URL}/seller/login`, credentials);
  };

  //Seller Register
  static sellerRegister = (sellerData) => {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    return axios.post(`${BASE_URL}/seller/`, sellerData, config);
  };

  //get TOTP by seller id
  static getTOTPBySellerId = (id) => {
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };
    return axios.get(`${BASE_URL}/seller/${id}/verification/status`, config);
  };

  //choose TOTP method by seller id
  static chooseTOTPMethodBySellerId = (id, method) => {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    return axios.post(
      `${BASE_URL}/seller/${id}/verification/choose-method`,
      { method: method },
      config
    );
  };

  //verify TOTP by seller id
  static verifyTOTPBySellerId = (sellerData, code) => {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const data = {
      _id: sellerData._id,
      id: sellerData.id,
      email: sellerData.email,
      token: code,
      role: sellerData.role,
    };
    return axios.post(
      `${BASE_URL}/seller/${sellerData._id}/verification`,
      data,
      config
    );
  };
}

export default SellerService;
