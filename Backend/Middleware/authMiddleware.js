// authMiddleware.js
const authMiddleware = (req, res, next) => {
    if (req.isAuthenticated()) {
      // User is authenticated, allow access to the route
      return next();
    } else {
      // User is not authenticated, handle the case (e.g., redirect to login page or return an error)
      res.status(401).json({ message: 'Unauthorized' });
    }
  };
  
  module.exports = authMiddleware;
  