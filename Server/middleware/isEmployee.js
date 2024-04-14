const IsEmployee = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role == "Employee") {
    console.log("IsEmployee");
    // console.log(req.user);
    // console.log(req.user.role);
    next();
  } else {
    res.redirect("/auth/login");
  }
};

module.exports = { IsEmployee };
