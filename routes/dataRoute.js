const express = require('express');
const {
    collectDataValidator
} = require('../validators/dataValidator');

const {
    collectData,
    addData,
    getData
} = require('../services/dataService');

const router = express.Router();

router.post('/collectData',collectDataValidator , collectData);
router.post('/addData/:id', addData);
router.get('/getdata/:id', getData);



module.exports = router;
