const validateUserAuth = (req, res, next) => {
    const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
        message: 'Email and password are required',
        success: false,
        data : {},
        error: 'Email and password are required'
    });
  }
  next();

}

const validateIsAdminRequest = (req, res, next) => {
    if (!req.body.id) {
        return res.status(400).json({
            message: 'User ID is required',
            success: false,
            data : {},
            error: 'User ID is not given'
        });
    }
    next();
}

module.exports = {
    validateUserAuth, 
    validateIsAdminRequest
}