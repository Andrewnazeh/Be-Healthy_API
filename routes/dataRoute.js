const express = require('express');
const {
    collectDataValidator
} = require('../validators/dataValidator');
const { protect } = require('../services/authService');

const processingData = require('../middlewares/processingDataMiddleware');


const {
    collectData,
    addData,
    getData,
    updateData
} = require('../services/dataService');

const router = express.Router();

router.post('/collectData', protect, collectDataValidator, processingData , collectData);
router.post('/addData', protect, addData);
router.get('/getdata', protect, getData);
router.put('/updatedata', protect, processingData, updateData);



module.exports = router;
