
const mongoose = require('mongoose');

const highlightSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    altText: {
      type: String,
      default: 'Muthoot Finance',
    },
    link: {
      type: String,
      default: '#corporate',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

highlightSchema.index({ isActive: 1, displayOrder: 1 });

module.exports =
  mongoose.models.Highlight ||
  mongoose.model('Highlight', highlightSchema);

