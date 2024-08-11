const express = require('express');
const {
  getAllBooks,
  getBookById,
  insertBook,
  deleteBookByName,
  buyBook,
} = require('../controllers/bookController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', auth, getAllBooks);
router.get('/:id', auth, getBookById);
router.post('/', auth, insertBook); // For Manager
router.delete('/:name', auth, deleteBookByName); // For Manager
router.post('/buy', auth, buyBook); // For Customer

module.exports = router;
