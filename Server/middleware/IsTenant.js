const IsTenant = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'Tenant') {
      return next();
    }
    return res.status(403).send('Access denied');
  };

  module.exports = { IsTenant };