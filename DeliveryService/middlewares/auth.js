
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");



// Checks if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {

    const { token } = req.cookies

    if (!token) {
        return next(new ErrorHandler('Login first to access this resource.', 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
      axios.get(`${"http://user-management:3001"}/me`, { headers: { Authorization: `Bearer ${decoded}` } })
      .then(response => {
        if (response.data.success) {
          req.user = response.data.user;
          next();
        } else {
          res.json({ success: false, message: 'Invalid token' });
        }
      })
      .catch(error => res.json({ success: false, message: error.message }));

    next()
})


// Handling users roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`Role (${req.user.role}) is not allowed to acccess this resource`, 403))
        }
        next()
    }
}