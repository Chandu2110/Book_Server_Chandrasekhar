const Book = require('../models/Book');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.insertBook = async (req, res) => {
  const { bookName, status } = req.body;

  try {
    let book = await Book.findOne({ bookName });
    if (book) {
      return res.status(400).json({ message: 'Book already exists' });
    }

    book = new Book({
      bookName,
      status: 'AVAILABLE',
    });

    await book.save();
    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteBookByName = async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ bookName: req.params.name });
    if (!book) return res.status(404).json({ message: 'Book not found' });

    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.buyBook = async (req, res) => {
  const { bookName } = req.body;

  try {
    const book = await Book.findOne({ bookName });
    if (!book) return res.status(404).json({ message: 'Book not found' });

    if (book.status === 'SOLD') {
      return res.status(400).json({ message: 'Book already sold' });
    }

    book.status = 'SOLD';
    await book.save();

    res.json({ message: 'Book purchased successfully', book });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
