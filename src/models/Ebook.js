const mongoose = require('mongoose');

// Schema for eBooks
const ebookSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  author: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  category: { 
    type: String, 
    required: true 
  },
  fileUrl: { 
    type: String, 
    required: true 
  },
  thumbnailUrl: { 
    type: String 
  },
  uploadDate: { 
    type: Date, 
    default: Date.now 
  },
  ratings: [{ 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Reference to User who rated
    rating: { type: Number, required: true, min: 1, max: 5 },         // Rating value (1-5)
    comment: { type: String }                                         // Optional comment
  }],
  averageRating: { 
    type: Number, 
    default: 0 
  },
  downloadCount: { 
    type: Number, 
    default: 0 
  }
});

// Method to calculate the average rating
ebookSchema.methods.calculateAverageRating = function() {
  if (this.ratings.length > 0) {
    const totalRating = this.ratings.reduce((acc, rating) => acc + rating.rating, 0);
    this.averageRating = totalRating / this.ratings.length;
  } else {
    this.averageRating = 0;
  }
};

// Method to increment the download count
ebookSchema.methods.incrementDownloadCount = function() {
  this.downloadCount += 1;
};

// Pre-save hook to calculate average rating before saving the document
ebookSchema.pre('save', function(next) {
  this.calculateAverageRating();
  next();
});

module.exports = mongoose.model('Ebook', ebookSchema);
