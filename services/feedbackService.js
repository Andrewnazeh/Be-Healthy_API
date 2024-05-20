const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const sendEmail = require('../utils/sendEmail');
const ApiError = require('../utils/apiError');

exports.recieveFeedback = asyncHandler(async (req, res) => {
    const user = req.user;
    const { feedback } = req.body;

    if (!feedback) {
        return next(new ApiError('Please provide feedback', 400));
    }

    await User.findByIdAndUpdate(
        req.user._id,
        { $push: { feedbacks: feedback } }
    )
    message = `Hi ${user.name},
    \nYour comment will make us active in making the application always modern and updated. 
    \nIf there are any problems, I promise you that they will be solved in as soon as.
    `;
    try {
        await sendEmail({
            email: user.email,
            subject: 'Thank you for sending your feedback.',
            message,
        });
    } catch (error) {
        return next(new ApiError('There is an error in sending email', 500));
    }


    res.status(200).json({ success: true });
})