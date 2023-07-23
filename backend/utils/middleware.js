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

// const isAuthor = (req, res, next) => {
//   if (req.body.userId !== req.user._id) {
//     return res.send("User is not the author");
//   }
//   next();
// };

// const isAdmin = (req, res, next) => {
//   if (x) {
//   }
//   next();
// };

module.exports = {
  isLoggedIn,
  isNotLoggedIn,
  //   isAuthor,
  //   isAdmin,
};
