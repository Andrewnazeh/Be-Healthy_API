const express = require('express');

const { protect } = require('../services/authService');
const { recieveFeedback } = require('../services/feedbackService');


const router = express.Router();

router.post('/recievemsg', protect, recieveFeedback);


module.exports = router;