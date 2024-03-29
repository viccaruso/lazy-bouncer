const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  /*
    TODO: Check for the session cookie and verify
    its contents using jsonwebtoken, then
    assign the payload to req.user
  */

  try {
    // Go get the value from the cookie (cookie is the jwt)
    const { session } = req.cookies;
    // Verify the jwt hasn't been messed with
    const payload = jwt.verify(session, process.env.JWT_SECRET);
    // set the user to value of payload
    req.user = payload;

    // move on to the next step (which is (req, res) in controller in this case?)
    next();
  } catch (error) { 
    // if an error is thrown (due to payload above giving an error?) send an error message
    error.message = 'You must be signed in to continue';
    error.status = 401; // 401 = Unauthorized (https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401)
    next(error);
  }
};
