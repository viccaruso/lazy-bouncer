const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  // TODO: Check req.user to ensure the user's email is 'admin'

  try { 
    // Go get the values from the cookie 
    const { session } = req.cookies;
    // Verify the cookie hasn't been altered
    const payload = jwt.verify(session, process.env.JWT_SECRET);
    // Set user to value of payload
    req.user = payload;

    console.log('THIS IS REQ.USER', req.user);

    // if the user is admin
    if (req.user.email === 'admin') {
      // continue on route
      next();
    // if the user is not an admin (or not logged in)
    } else {
      // throw an error (which will be caught below)
      throw new Error(); // 
    }

  } catch (error) {
    // if an error is thrown send an error message
    error.message = 'You do not have access to view this page';
    error.status = 403; // 403 = Forbidden (https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403)
    next(error);
  }
};
