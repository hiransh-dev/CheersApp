const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.send("User not logged in");
  }
  next();
};

const isNotLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.send("User is already logged in");
  }
  next();
};

const isNotManagement = (req, res, next) => {
  if (req.user) {
    if (req.user.isAdmin === true || req.user.isStaff === true) {
      return res.send("Cannot use Management Account");
    }
  }
  next();
};

const isManagement = (req, res, next) => {
  if (req.user) {
    if (req.user.isAdmin === false && req.user.isStaff === false) {
      return res.send("Cannot use User/Customer Account");
    }
  }
  next();
};

const isUserAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    if (req.user.isAdmin === true) {
      next();
    } else {
      console.log("User is not an Admin"); /* REMOVE LATER */
      return res.send("User is not an Admin");
    }
  } else {
    console.log("User is not an Admin"); /* REMOVE LATER */
    return res.send("User is not an Admin");
  }
};

module.exports = {
  isLoggedIn,
  isNotLoggedIn,
  isUserAdmin,
  isNotManagement,
  isManagement,
};
