const IsAdminOrOwner = (req, res, next) => {
    if (req.isAuthenticated() && (req.user.role === 'Admin' || req.user.role === 'Owner')) {
      return next();
    }
    res.status(403).send('Access Denied: You do not have permission to perform this action.');
  };
  
  module.exports = { IsAdminorOwner };