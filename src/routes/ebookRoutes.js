const express = require('express');
const { getAllEbooks, getEbookById, addEbook, rateEbook, downloadEbook } = require('../controllers/ebookController');

const router = express.Router();

router.get('/', getAllEbooks);
router.get('/:id', getEbookById);
router.post('/', addEbook); 
router.post('/:id/rate', rateEbook); 
router.get('/:id/download', downloadEbook); 

module.exports = router;
