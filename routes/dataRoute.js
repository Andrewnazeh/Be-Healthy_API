const express = require('express');
const {
    collectDataValidator
} = require('../validators/dataValidator');
const { protect } = require('../services/authService')


const {
    collectData,
    addData,
    getData
} = require('../services/dataService');

const router = express.Router();

router.post('/collectData',protect,collectDataValidator , collectData);
router.post('/addData', protect, addData);
router.get('/getdata',protect, getData);



module.exports = router;
