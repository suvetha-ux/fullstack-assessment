// authMiddleware.js
// Temporary middleware to bypass JWT verification.
// This middleware simply attaches a dummy user object to the request for testing purposes.
// Remember to replace this with proper JWT verification in production.

const dummyAuth = (req, res, next) => {
  // Attach a dummy user. You can expand this object as needed.
  req.user = { username: "dummyUser" };
  next();
};

module.exports = dummyAuth;