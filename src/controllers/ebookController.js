const Ebook = require('../models/Ebook');

// Fetch all eBooks
exports.getAllEbooks = async (req, res) => {
  try {
    const ebooks = await Ebook.find().select('-__v'); // Exclude unnecessary fields like `__v`
    res.status(200).json(ebooks);
  } catch (error) {
    console.error('Error fetching eBooks:', error);
    res.status(500).json({ message: 'Error fetching eBooks', error: error.message });
  }
};

// Fetch eBook by ID
exports.getEbookById = async (req, res) => {
  try {
    const ebook = await Ebook.findById(req.params.id).select('-__v');
    if (!ebook) return res.status(404).json({ message: 'eBook not found' });
    res.status(200).json(ebook);
  } catch (error) {
    console.error('Error fetching eBook:', error);
    res.status(500).json({ message: 'Error fetching eBook', error: error.message });
  }
};

// Add a new eBook
exports.addEbook = async (req, res) => {
  try {
    const { title, author, description, category, fileUrl, thumbnailUrl } = req.body;

    // Validate required fields
    if (!fileUrl || !category) {
      return res.status(400).json({ message: 'File URL and Category are required' });
    }

    const newEbook = new Ebook({
      title: title || 'Untitled', // Default title if not provided
      author: author || 'Unknown', // Default author if not provided
      description: description || 'No description available', // Default description
      category,
      fileUrl,
      thumbnailUrl: thumbnailUrl || null, // Optional field
      ratings: [],
      averageRating: 0,
      downloadCount: 0,
    });

    const savedEbook = await newEbook.save();
    res.status(201).json(savedEbook);
  } catch (error) {
    console.error('Error adding eBook:', error);
    res.status(500).json({ message: 'Error adding eBook', error: error.message });
  }
};

exports.rateEbook = async (req, res) => {
  try {
    const { rating, userId, comment } = req.body;
    const ebook = await Ebook.findById(req.params.id);

    if (!ebook) return res.status(404).json({ message: 'eBook not found' });

    // Add the new rating
    ebook.ratings.push({ userId, rating, comment });

    // Save the updated ebook (average rating will be recalculated in the pre-save hook)
    await ebook.save();

    res.status(200).json(ebook);
  } catch (error) {
    res.status(500).json({ message: 'Error rating eBook', error });
  }
};

exports.downloadEbook = async (req, res) => {
  try {
    const ebook = await Ebook.findById(req.params.id);
    if (!ebook) return res.status(404).json({ message: 'eBook not found' });

    // Increment the download count
    ebook.incrementDownloadCount();

    // Save the ebook after incrementing download count
    await ebook.save();

    res.status(200).json({
      message: 'Download successful',
      fileUrl: ebook.fileUrl,
      downloadCount: ebook.downloadCount, // Include updated download count
    });
  } catch (error) {
    res.status(500).json({ message: 'Error downloading eBook', error });
  }
};
