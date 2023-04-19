const User = require('../models/users.model');
const AppError = require('../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.validIfExistUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
      status: 'available',
    },
  });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found',
    });
    //next(new AppError('User not found', 404));
  }

  req.user = user;
  next();
});
