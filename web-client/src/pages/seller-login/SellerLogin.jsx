import {
  TextInput,
  PasswordInput,
  Checkbox,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Box,
  Image,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import SellerService from "../../services/sellerService";
import { notifications } from "@mantine/notifications";
import sha256 from "crypto-js/sha256";
import Reaptcha from "reaptcha";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FcApproval } from "react-icons/fc";
import { FiAlertTriangle } from "react-icons/fi";

const SellerLogin = () => {
  if (localStorage.getItem("role")) {
    if (localStorage.getItem("role") === "seller") {
      window.location.href = "/seller/dashboard";
    } else {
      //to do
    }
  }

  const [otpStep, setOtpStep] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [sellerData, setSellerData] = useState({
    _id: "",
    name: "",
    email: "",
    role: "seller",
  });
  const [choosenMethod, setChoosenMethod] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [otp, setOtp] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [registerForm, setRegisterForm] = useState(false);

  const sellerLogin = (values) => {
    notifications.show({
      id: "login-seller",
      loading: true,
      title: "Logging in...",
      message: "Please wait while we log you in to the seller dashboard",
      autoClose: false,
      withCloseButton: false,
    });

    const encryptedPassword = sha256(values.password);

    SellerService.sellerLogin(values.email, encryptedPassword.toString())
      .then(async (response) => {
        setSellerData({
          _id: response.data.data._id,
          id: response.data.data._id,
          email: response.data.data.email,
          role: "seller",
        });
        await SellerService.getTOTPBySellerId(response.data.data._id)
          .then((response) => {
            setIsFirstTime(response.data.data.isFirstTime);
            setOtpStep(true);
            notifications.update({
              id: "login-seller",
              color: "teal",
              title: "Logged in successfully",
              message:
                "You have been logged in successfully. Redirecting you to the seller dashboard...",
              icon: <FcApproval size={16} />,
              autoClose: 1000,
            });
          })
          .catch(() => {
            notifications.update({
              id: "login-seller",
              color: "red",
              title: "Login failed",
              message:
                "We were unable to log you in. Please check your email and password and try again.",
              icon: <FiAlertTriangle size={16} />,
              autoClose: 5000,
            });
            return null;
          });
      })
      .catch(() => {
        notifications.update({
          id: "login-seller",
          color: "red",
          title: "Login failed",
          message:
            "We were unable to log you in. Please check your email and password and try again.",
          icon: <FiAlertTriangle size={16} />,
          autoClose: 5000,
        });
      });
  };

  const choose2FAMethod = async (method) => {
    notifications.show({
      id: "choose-otp-method",
      loading: true,
      title: "Please wait...",
      message: "We are processing your request",
      autoClose: false,
      withCloseButton: false,
    });
    await SellerService.chooseTOTPMethodBySellerId(sellerData._id, method)
      .then((response) => {
        if (method === "email") {
          setChoosenMethod("email");
          notifications.update({
            id: "choose-otp-method",
            color: "teal",
            title: "Success",
            message: "We have sent you an OTP to your email",
            icon: <FcApproval size={16} />,
            autoClose: 1000,
          });
        } else {
          setChoosenMethod("app");
          setQrCode(response.data.data.qrCode);
          notifications.update({
            id: "choose-otp-method",
            color: "teal",
            title: "Success",
            message: "Please scan the QR code usine your authenticator app",
            icon: <FcApproval size={16} />,
            autoClose: 1000,
          });
        }
      })
      .catch(() => {
        notifications.update({
          id: "choose-otp-method",
          color: "red",
          title: "Failed",
          message: "We were unable to process your request",
          icon: <FiAlertTriangle size={16} />,
          autoClose: 5000,
        });
      });
  };

  const verifyOTP = async () => {
    notifications.show({
      id: "verify-otp",
      loading: true,
      title: "Please wait...",
      message: "We are verifying your OTP",
      autoClose: false,
      withCloseButton: false,
    });
    await SellerService.verifyTOTPBySellerId(sellerData, otp)
      .then((response) => {
        if (response.data.data.isTOTPVerified) {
          notifications.update({
            id: "verify-otp",
            color: "teal",
            title: "Success",
            message: "You have been verified successfully",
            icon: <FcApproval size={16} />,
            autoClose: 1000,
          });
          const sellerDataNew = {
            ...sellerData,
            accessToken: response.data.data.accessToken,
            refreshToken: response.data.data.refreshToken,
          };
          //add data to local storage
          localStorage.setItem("seller", JSON.stringify(sellerDataNew));
          //wait to notification to close and redirect to seller dashboard
          setTimeout(() => {
            //Add role to local storage
            localStorage.setItem("role", "seller");
            window.location.href = "/seller/dashboard";
          }, 1000);
        } else {
          notifications.update({
            id: "verify-otp",
            color: "red",
            title: "Failed",
            message: "We were unable to verify your OTP, please try again",
            icon: <FiAlertTriangle size={16} />,
            autoClose: 5000,
          });
        }
      })
      .catch(() => {
        notifications.update({
          id: "verify-otp",
          color: "red",
          title: "Failed",
          message: "We were unable to verify your OTP, please try again",
          icon: <FiAlertTriangle size={16} />,
          autoClose: 5000,
        });
      });
  };

  const form = useForm({
    validateInputOnChange: true,
    initialValues: { email: "", password: "", remember: false },

    validate: {
      email: (value) =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
        )
          ? null
          : "Invalid email",
    },
  });

  const regForm = useForm({
    validateInputOnChange: true,
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      stateOrProvince: "",
      postalCode: "",
      country: "",
      phoneNumber: "",
    },
    validate: {
      firstName: (value) =>
        value.length > 0 ? null : "First name is required",
      lastName: (value) => (value.length > 0 ? null : "Last name is required"),
      email: (value) =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
        )
          ? null
          : "Invalid email",
      password: (
        value //min 8 characters, 1 uppercase, 1 lowercase, 1 number
      ) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)
          ? null
          : "Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter and 1 number",
      confirmPassword: (value) =>
        value === regForm.values.password ? null : "Passwords do not match",
      phoneNumber: (value) =>
        /^[0-9]{10}$/.test(value) ? null : "Invalid phone number",
      addressLine1: (value) =>
        value.length > 0 ? null : "Address line 1 is required",
      city: (value) => (value.length > 0 ? null : "City is required"),
      stateOrProvince: (value) =>
        value.length > 0 ? null : "State/Province is required",
      postalCode: (value) =>
        value.length > 0 ? null : "Postal code is required",
    },
  });

  const sellerRegister = async (values) => {
    notifications.show({
      id: "seller-register",
      loading: true,
      title: "Please wait...",
      message: "We are registering your account",
      autoClose: false,
      withCloseButton: false,
    });
    const encryptedPassword = sha256(values.password);
    values.password = encryptedPassword;
    delete values.confirmPassword;
    await SellerService.sellerRegister(values)
      .then(() => {
        notifications.update({
          id: "seller-register",
          color: "teal",
          title: "Success",
          message: "Your account has been registered successfully. Please login",
          icon: <FcApproval size={16} />,
          autoClose: 5000,
        });
        setRegisterForm(false);
      })
      .catch(() => {
        notifications.update({
          id: "seller-register",
          color: "red",
          title: "Failed",
          message: "We were unable to register your account, please try again",
          icon: <FiAlertTriangle size={16} />,
          autoClose: 5000,
        });
      });
  };

  //set the page title
  document.title = "Seller Login - Tuition Management System";

  return (
    <Container size={420} my={40}>
      {!otpStep && !registerForm && (
        <>
          <Title
            align="center"
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 900,
            })}
          >
            Seller Login
          </Title>
          <Text color="dimmed" size="sm" align="center" mt={5}>
            Enter your credentials to access the Seller Dashboard
          </Text>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <form onSubmit={form.onSubmit((values) => sellerLogin(values))}>
              <TextInput
                label="Email"
                placeholder="you@example.dev"
                required
                {...form.getInputProps("email")}
                ta={"left"}
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                required
                mt="md"
                {...form.getInputProps("password")}
                ta={"left"}
              />
              <Group position="apart" mt="md">
                <Checkbox
                  label="Remember me"
                  {...form.getInputProps("remember")}
                />
                <Link
                  href="/seller-forget-password"
                  size="sm"
                  style={{ textDecoration: "none", color: "#1C7ED6" }}
                >
                  Forgot password?
                </Link>
              </Group>
              <Box mt="md" mb="md" ml={10}>
                <Reaptcha
                  sitekey="6LdsI54lAAAAAMuwi9HnGSp6Ny0fgqhjGH1I6HP1"
                  onVerify={() => {
                    setCaptchaVerified(true);
                  }}
                  onExpire={() => {
                    setCaptchaVerified(false);
                  }}
                />
              </Box>
              <Button
                fullWidth
                mt="xl"
                type="submit"
                disabled={!captchaVerified}
                sx={{
                  backgroundColor: captchaVerified
                    ? "#1C7ED6 !important"
                    : "#E9ECEF !important",
                }}
              >
                Sign in
              </Button>
            </form>
          </Paper>

          <Text ta="center" mt="md">
            Don&apos;t have an account?{" "}
            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault();
                setRegisterForm(true);
              }}
              weight={700}
              style={{ textDecoration: "none", color: "#1C7ED6" }}
            >
              Register
            </Link>
          </Text>
        </>
      )}
      {otpStep && isFirstTime && choosenMethod === "" && (
        <>
          <Title
            align="center"
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 900,
            })}
          >
            Choose Two Factor Authentication Method
          </Title>
          <Text color="dimmed" size="sm" align="center" mt={5}>
            Choose the method you want to use for two factor authentication.
            This will be used to verify your identity when logging in. You can
            change this method at any time. This is mandatory.
          </Text>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <Button
              fullWidth
              mt="xl"
              onClick={() => {
                choose2FAMethod("app");
              }}
              sx={{ backgroundColor: "#3b5998 !important", color: "white" }}
            >
              Authenticator App - Recommended
            </Button>
            <Button
              fullWidth
              mt="xl"
              onClick={() => {
                choose2FAMethod("email");
              }}
              sx={{ backgroundColor: "#db4437 !important", color: "white" }}
            >
              Email
            </Button>
          </Paper>
        </>
      )}
      {otpStep && isFirstTime && choosenMethod === "app" && (
        <>
          <Title
            align="center"
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 900,
            })}
          >
            Scan the QR Code
          </Title>
          <Text color="dimmed" size="sm" align="center" mt={5}>
            Scan the QR code using your authenticator app to complete the
            process. And then enter the OTP below.
          </Text>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <Image src={qrCode} alt="QR Code" m={"auto"} />
            <TextInput
              label="OTP"
              placeholder="Enter the OTP"
              required
              mt="md"
              onChange={(e) => setOtp(e.target.value)}
            />
            <Button
              fullWidth
              mt="xl"
              onClick={() => {
                verifyOTP();
              }}
              sx={{ backgroundColor: "#1C7ED6 !important" }}
            >
              Verify
            </Button>
          </Paper>
        </>
      )}
      {otpStep &&
        isFirstTime &&
        (choosenMethod === "phone" || choosenMethod === "email") && (
          <>
            <Title
              align="center"
              sx={(theme) => ({
                fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                fontWeight: 900,
              })}
            >
              Enter the OTP
            </Title>
            <Text color="dimmed" size="sm" align="center" mt={5}>
              Enter the OTP sent to your {choosenMethod} to complete the
              process.
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
              <TextInput
                label="OTP"
                placeholder="Enter the OTP"
                required
                mt="md"
                onChange={(e) => setOtp(e.target.value)}
              />
              <Button
                fullWidth
                mt="xl"
                onClick={() => {
                  verifyOTP();
                }}
                sx={{ backgroundColor: "#1C7ED6 !important" }}
              >
                Verify
              </Button>
            </Paper>
          </>
        )}
      {otpStep && !isFirstTime && (
        <>
          <Title
            align="center"
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 900,
            })}
          >
            Enter the OTP
          </Title>
          <Text color="dimmed" size="sm" align="center" mt={5}>
            Enter the OTP sent to your previously choosen method to complete
            process.
          </Text>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput
              label="OTP"
              placeholder="Enter the OTP"
              required
              mt="md"
              onChange={(e) => setOtp(e.target.value)}
            />
            <Button
              fullWidth
              mt="xl"
              onClick={() => {
                verifyOTP();
              }}
              sx={{ backgroundColor: "#1C7ED6 !important" }}
            >
              Verify
            </Button>
          </Paper>
        </>
      )}
      {registerForm && (
        <>
          <Title
            align="center"
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 900,
            })}
          >
            Register
          </Title>
          <Text color="dimmed" size="sm" align="center" mt={5}>
            Register to start selling on the marketplace.
          </Text>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <form
              onSubmit={regForm.onSubmit((values) => {
                sellerRegister(values);
              })}
            >
              <TextInput
                label="First name"
                placeholder="Enter your first name"
                required
                {...regForm.getInputProps("firstName")}
                ta={"left"}
              />
              <TextInput
                label="Last name"
                placeholder="Enter your last name"
                required
                {...regForm.getInputProps("lastName")}
                ta={"left"}
              />
              <TextInput
                label="Email"
                placeholder="Enter your email"
                required
                {...regForm.getInputProps("email")}
                ta={"left"}
              />
              <PasswordInput
                placeholder="Your password"
                label="Password"
                required
                {...regForm.getInputProps("password")}
                ta={"left"}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              />
              <PasswordInput
                placeholder="Confirm password"
                label="Confirm Password"
                required
                {...regForm.getInputProps("confirmPassword")}
                ta={"left"}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              />
              <TextInput
                label="Phone number"
                placeholder="Enter your phone number"
                required
                {...regForm.getInputProps("phoneNumber")}
                ta={"left"}
              />
              <TextInput
                label="Address line 1"
                placeholder="Enter your address"
                required
                {...regForm.getInputProps("addressLine1")}
                ta={"left"}
              />
              <TextInput
                label="Address line 2"
                placeholder="Enter your address"
                required
                {...regForm.getInputProps("addressLine2")}
                ta={"left"}
              />
              <TextInput
                label="City"
                placeholder="Enter your city"
                required
                {...regForm.getInputProps("city")}
                ta={"left"}
              />
              <TextInput
                label="State/Province"
                placeholder="Enter your state or province"
                required
                {...regForm.getInputProps("stateOrProvince")}
                ta={"left"}
              />
              <TextInput
                label="Country"
                placeholder="Enter your country"
                required
                {...regForm.getInputProps("country")}
                ta={"left"}
              />
              <TextInput
                label="Postal Code"
                placeholder="Enter your postal code"
                required
                {...regForm.getInputProps("postalCode")}
                ta={"left"}
              />
              <Button
                fullWidth
                mt="xl"
                type="submit"
                sx={{ backgroundColor: "#1C7ED6 !important" }}
              >
                Register
              </Button>
            </form>
          </Paper>

          <Text ta="center" mt="md">
            Already have an account?{" "}
            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault();
                setRegisterForm(false);
              }}
              weight={700}
              style={{ textDecoration: "none", color: "#1C7ED6" }}
            >
              Login
            </Link>
          </Text>
        </>
      )}
    </Container>
  );
};

export default SellerLogin;
