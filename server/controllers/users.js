const User = require('../models/user');
const jwt = require('jsonwebtoken');


// @desc Admin login
// @route POST
// @access Admins Only
exports.adminLogin = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const secretKey = req.body.twoFac;

  if (secretKey === "heides3cr3t") {
    User.findOne({ username }).exec(function(err, user) {
      if (err) {
        console.log("cannot find user", err);
        res.status(400).json(err);
      } else if (user) {
        if (user.password === password) {
          var token = jwt.sign({ username: user.username}, 'heides3cr3t', { expiresIn: '40m' });
          res.status(200).json({success: true, msg: "Successly fully logged in!", token, id: user.id, fullname: user.fullname });
        } else {
          res.send({
            code: 403,
            type: "credentials",
            msg: "Username or password is incorrect!!"
          });
        }
      } else {
        res.send({
          code: 403,
          type: "credentials",
          msg: "Username or password is incorrect!!"
        });
      }
    });
  } else {
    res.send({
      code: 403,
      type: "2Fac",
      msg: "Please input correct Two Factor Auth Code"
    });
  }

};

// Verify token middleware
exports.verifyToken = (req, res, next) => {
  // Get auth Header value
  var bearerHeader = req.headers.authorization;
  if (bearerHeader) {
    // Get token from array
    var token = req.headers.authorization.split(' ')[1]; 
    jwt.verify(token, 'heides3cr3t', function(error, decoded) { 
      if (error) {
        console.log(error);
        res.send({
          code: 401,
          msg: "You are not Authorized to do that operation."
        });
      } else {
        req.user = decoded.username;
        next();
      }
    });
  } else {
    res.status(403).json('No token provided');
  }
};
