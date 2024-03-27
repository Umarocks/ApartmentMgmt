const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login"); // if not auth
};

const forwardAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/addTodo"); // if auth
};

module.exports = {
  ensureAuthenticated,
  forwardAuthenticated,
};
