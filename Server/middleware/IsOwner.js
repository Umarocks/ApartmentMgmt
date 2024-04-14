const IsOwner = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "Owner") {
    return next();
  }
  return res.status(403).send("Access denied");
};

module.exports = { IsOwner };
