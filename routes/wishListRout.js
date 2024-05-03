const express = require('express');

const authService = require('../services/authService');

const {
  addTrainingToWishlist,
  removeTrainingFromWishlist,
  getLoggedUserWishlist,
} = require('../services/wishlistService');

const router = express.Router();

router.use(authService.protect, authService.allowedTo('user'));

router.route('/').post(addTrainingToWishlist)
      .get(getLoggedUserWishlist);

router.delete('/:TrainingId',
 removeTrainingFromWishlist);

module.exports = router;