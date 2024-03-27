const IsAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role == "Admin") {
    console.log("IsAdmin");
    // console.log(req.user);
    // console.log(req.user.role);
    next();
  } else {
    res.redirect("/auth/login");
  }
};

module.exports = { IsAdmin };
