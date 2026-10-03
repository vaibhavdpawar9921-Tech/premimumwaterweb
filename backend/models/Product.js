const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, 'Product code is required (e.g. Product 01)'],
      trim: true,
      unique: true,
    },
    nameEn: {
      type: String,
      required: [true, 'English product name is required'],
      trim: true,
    },
    nameMr: {
      type: String,
      required: [true, 'Marathi product name is required'],
      trim: true,
    },
    sizePlaceholder: {
      type: String,
      required: true,
      default: '[Available Size: 500ml / 1 Litre]',
    },
    taglineEn: {
      type: String,
      default: '',
    },
    taglineMr: {
      type: String,
      default: '',
    },
    descriptionEn: {
      type: String,
      required: true,
    },
    descriptionMr: {
      type: String,
      required: true,
    },
    featuresEn: {
      type: [String],
      default: [],
    },
    featuresMr: {
      type: [String],
      default: [],
    },
    badgeEn: {
      type: String,
      default: '',
    },
    badgeMr: {
      type: String,
      default: '',
    },
    bottleColor: {
      type: String,
      default: '#1557A6',
    },
    price: {
      type: Number,
      default: 0,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
