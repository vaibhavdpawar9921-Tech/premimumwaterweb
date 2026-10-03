const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['dealership', 'contact', 'product_enquiry'],
      default: 'dealership',
      required: true,
    },
    // Contact Person & Business Details
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    businessName: {
      type: String,
      trim: true,
      default: '',
    },
    mobileNumber: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    area: {
      type: String,
      trim: true,
      default: '',
    },
    businessType: {
      type: String,
      enum: [
        'Distributor',
        'Retail Wholesaler',
        'Hotel / Restaurant Partner',
        'Corporate / Bulk Buyer',
        'Other',
      ],
      default: 'Distributor',
    },
    productName: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['new', 'in_review', 'contacted', 'approved', 'rejected'],
      default: 'new',
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Enquiry || mongoose.model('Enquiry', enquirySchema);
