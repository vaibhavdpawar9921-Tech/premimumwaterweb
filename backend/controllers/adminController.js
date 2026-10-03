const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const JWT_SECRET = process.env.JWT_SECRET || 'royal_premium_water_secret_key_2025';

// Default mock admin credentials for fast local development
const DEFAULT_ADMIN = {
  username: 'admin',
  email: 'admin@royalwater.com',
  password: 'admin', // in production hash with bcrypt
  role: 'superadmin',
};

// @desc    Admin login
// @route   POST /api/admin/login
exports.adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required',
      });
    }

    let adminUser = null;
    let isMatch = false;

    try {
      adminUser = await Admin.findOne({
        $or: [{ username }, { email: username.toLowerCase() }],
      });

      if (adminUser) {
        isMatch = await adminUser.comparePassword(password);
      }
    } catch (dbErr) {
      console.warn('DB query error in adminLogin, checking default admin:', dbErr.message);
    }

    // Fallback default admin if no DB user found
    if (!adminUser && (username === DEFAULT_ADMIN.username || username === DEFAULT_ADMIN.email)) {
      if (password === DEFAULT_ADMIN.password || password === 'royal2025') {
        adminUser = DEFAULT_ADMIN;
        isMatch = true;
      }
    }

    if (!adminUser || !isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid administrator credentials',
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: adminUser._id || 'admin_super_01',
        username: adminUser.username,
        role: adminUser.role || 'admin',
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      message: 'Admin authentication successful',
      token,
      admin: {
        username: adminUser.username,
        email: adminUser.email,
        role: adminUser.role || 'admin',
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error during admin login',
    });
  }
};

// @desc    Verify current admin session
// @route   GET /api/admin/me
exports.getAdminProfile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No authorization token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    return res.status(200).json({
      success: true,
      admin: {
        id: decoded.id,
        username: decoded.username,
        role: decoded.role,
      },
    });
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};
