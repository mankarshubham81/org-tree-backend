// routes/employees.js
const express = require('express');
const multer = require('multer');
const { addEmployee, getOrgTree, getAllEmployees } = require('../controllers/employeeController');

const router = express.Router();

// Use memory storage only (no local disk)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['image/png', 'image/jpg', 'image/jpeg'];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Only PNG, JPG, JPEG files are allowed'));
  },
});

// Routes
router.get('/tree', getOrgTree);
router.get('/', getAllEmployees);
router.post('/', upload.single('image'), addEmployee);

module.exports = router;