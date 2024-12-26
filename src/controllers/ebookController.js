const Ebook = require('../models/Ebook');

exports.getAllEbooks = async (req, res) => {
  try {
    const ebooks = await Ebook.find();
    res.status(200).json(ebooks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching eBooks', error });
  }
};

exports.getEbookById = async (req, res) => {
  try {
    const ebook = await Ebook.findById(req.params.id);
    if (!ebook) return res.status(404).json({ message: 'eBook not found' });
    res.status(200).json(ebook);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching eBook', error });
  }
};

exports.addEbook = async (req, res) => {
  try {
    const { title, author, description, category, fileUrl, thumbnailUrl } = req.body;

    if (!fileUrl) {
      return res.status(400).json({ message: 'File URL is required' });
    }

    if (!category) {
      return res.status(400).json({ message: 'Category is required' });
    }

    const newEbook = new Ebook({
      title,
      author,
      description,
      category,
      fileUrl,
      thumbnailUrl,  
      ratings: [],   
      averageRating: 0,  
      downloadCount: 0,  
    });

    const savedEbook = await newEbook.save();

    res.status(201).json(savedEbook);
  } catch (error) {
    res.status(500).json({ message: 'Error adding eBook', error });
  }
};

exports.rateEbook = async (req, res) => {
  try {
    const { rating } = req.body;
    const ebook = await Ebook.findById(req.params.id);
    if (!ebook) return res.status(404).json({ message: 'eBook not found' });

    ebook.ratings.push(rating);
    ebook.averageRating = ebook.ratings.reduce((sum, rate) => sum + rate, 0) / ebook.ratings.length;
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
    res.status(200).json({ fileUrl: ebook.fileUrl });
  } catch (error) {
    res.status(500).json({ message: 'Error downloading eBook', error });
  }
};
