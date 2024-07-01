const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');

// @desc    Add Training to wishlist
// @route   POST /api/v1/wishlist
// @access  Protected/User
exports.addTrainingToWishlist = asyncHandler(async (req, res, next) => {
  // $addToSet => add TrainingId to wishlist array if TrainingId not exist
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { wishlist: req.body.trainingId },
    },
    { new: true }
  );

  res.status(200).json({
    status: 'success',
    message: 'Training added successfully to your wishlist.',
    data: user.wishlist,
  });
});

// @desc    Remove Training from wishlist
// @route   DELETE /api/v1/wishlist/:TrainingId
// @access  Protected/User
exports.removeTrainingFromWishlist = asyncHandler(async (req, res, next) => {
  // $pull => remove TrainingId from wishlist array if TrainingId exist
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { wishlist: req.params.trainingId },
    },
    { new: true }
  );

  res.status(200).json({
    status: 'success',
    message: 'Training removed successfully from your wishlist.',
    data: user.wishlist,
  });
});

// @desc    Get logged user wishlist
// @route   GET /api/v1/wishlist
// @access  Protected/User
exports.getLoggedUserWishlist = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate('wishlist');
  const translatedTraining = user.wishlist.map(item => {
    return {
      _id: user.wishlist._id,
      name: item.name[req.getLocale()],
      description: item.description[req.getLocale()],
      level: item.level[req.getLocale()],
      image: item.image,
      link: item.link,
      category: item.category[req.getLocale()]
    }
  });
  res.status(200).json({
    status: 'success',
    results: user.wishlist.length,
    data: translatedTraining,
  });
});