const Enquiry = require('../models/Enquiry');

// In-memory cache fallback for development/testing when MongoDB is not connected
const inMemoryEnquiries = [];

// @desc    Submit a new enquiry or dealership application
// @route   POST /api/enquiries
exports.createEnquiry = async (req, res) => {
  try {
    const {
      type = 'dealership',
      fullName,
      name, // support both name and fullName
      businessName = '',
      mobileNumber,
      mobile, // support both mobile and mobileNumber
      email = '',
      city = '',
      area = '',
      businessType = 'Distributor',
      productName = '',
      message = '',
    } = req.body;

    const applicantName = fullName || name;
    const contactMobile = mobileNumber || mobile;

    // Validation
    if (!applicantName || !applicantName.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Name is required',
      });
    }

    if (!contactMobile || !contactMobile.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Valid contact mobile number is required',
      });
    }

    const newEnquiryPayload = {
      type: type || 'dealership',
      fullName: applicantName.trim(),
      businessName: businessName.trim(),
      mobileNumber: contactMobile.trim(),
      email: email ? email.trim() : '',
      city: city ? city.trim() : '',
      area: area ? area.trim() : '',
      businessType,
      productName,
      message: message ? message.trim() : '',
      status: 'new',
      createdAt: new Date(),
    };

    let savedEnquiry;
    try {
      savedEnquiry = await Enquiry.create(newEnquiryPayload);
    } catch (dbErr) {
      // In-memory fallback if Mongo is offline
      const fallbackItem = {
        _id: 'enq_' + Date.now(),
        ...newEnquiryPayload,
        updatedAt: new Date(),
      };
      inMemoryEnquiries.unshift(fallbackItem);
      savedEnquiry = fallbackItem;
    }

    return res.status(201).json({
      success: true,
      message:
        type === 'dealership'
          ? 'Dealership application received successfully. Royal Premium Water team will connect shortly.'
          : 'Thank you for reaching out. We will contact you soon.',
      data: savedEnquiry,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error processing enquiry',
    });
  }
};

// @desc    Get all enquiries
// @route   GET /api/enquiries
exports.getEnquiries = async (req, res) => {
  try {
    const { type, status } = req.query;
    const filter = {};
    if (type) filter.type = type;
    if (status) filter.status = status;

    let enquiries;
    try {
      enquiries = await Enquiry.find(filter).sort({ createdAt: -1 });
    } catch (dbErr) {
      enquiries = inMemoryEnquiries.filter((item) => {
        if (type && item.type !== type) return false;
        if (status && item.status !== status) return false;
        return true;
      });
    }

    return res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single enquiry by ID
// @route   GET /api/enquiries/:id
exports.getEnquiryById = async (req, res) => {
  try {
    let enquiry;
    try {
      enquiry = await Enquiry.findById(req.params.id);
    } catch (dbErr) {
      enquiry = inMemoryEnquiries.find((item) => item._id === req.params.id);
    }

    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    return res.status(200).json({ success: true, data: enquiry });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update enquiry status
// @route   PATCH /api/enquiries/:id/status
exports.updateEnquiryStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const validStatuses = ['new', 'in_review', 'contacted', 'approved', 'rejected'];

    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Choose from: ${validStatuses.join(', ')}`,
      });
    }

    let updatedEnquiry;
    try {
      const updateData = {};
      if (status) updateData.status = status;
      if (notes !== undefined) updateData.notes = notes;

      updatedEnquiry = await Enquiry.findByIdAndUpdate(
        req.params.id,
        { $set: updateData },
        { new: true }
      );
    } catch (dbErr) {
      const found = inMemoryEnquiries.find((item) => item._id === req.params.id);
      if (found) {
        if (status) found.status = status;
        if (notes !== undefined) found.notes = notes;
        found.updatedAt = new Date();
        updatedEnquiry = found;
      }
    }

    if (!updatedEnquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Status updated successfully',
      data: updatedEnquiry,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete enquiry
// @route   DELETE /api/enquiries/:id
exports.deleteEnquiry = async (req, res) => {
  try {
    let deleted = false;
    try {
      const resDb = await Enquiry.findByIdAndDelete(req.params.id);
      if (resDb) deleted = true;
    } catch (dbErr) {
      const idx = inMemoryEnquiries.findIndex((item) => item._id === req.params.id);
      if (idx !== -1) {
        inMemoryEnquiries.splice(idx, 1);
        deleted = true;
      }
    }

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Enquiry deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
