const adminAuth = (req, res, next) => {
  if (req.headers.adminmongodb) {
    next();
  } else {
    res.status(401).send('Unauthorized: Missing Token');
  }
};

module.exports = adminAuth;
