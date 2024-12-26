const express = require('express');
const { getAllEbooks, getEbookById, addEbook, rateEbook, downloadEbook } = require('../controllers/ebookController');
const { authenticate, isAuthorized } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllEbooks);
router.get('/:id', getEbookById);
router.post('/', authenticate, isAuthorized(['admin', 'editor']), addEbook); // Admin only
router.post('/:id/rate', authenticate, rateEbook); // User
router.get('/:id/download', authenticate, downloadEbook); // User

module.exports = router;
