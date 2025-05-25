// controllers/employeeController.js
const Employee = require('../models/employee.model');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

// Add new employee
const addEmployee = async (req, res) => {
  try {
    const { name, designation, dob, experience, reportingManager } = req.body;
    if (!name || !designation || !dob || !experience) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Upload to Cloudinary if file provided
    let imageUrl = '';
    if (req.file) {
      imageUrl = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'employee_images' },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });
    }

    const newEmployee = new Employee({
      name,
      designation,
      dob,
      experience,
      reportingManager: reportingManager || null,
      image: imageUrl,
    });

    const saved = await newEmployee.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Build tree structure recursively
const buildTree = (employees, managerId = null) =>
  employees
    .filter(emp => String(emp.reportingManager) === String(managerId))
    .map(emp => ({
      ...emp._doc,
      children: buildTree(employees, emp._id),
    }));

// Get org tree
const getOrgTree = async (req, res) => {
  try {
    const employees = await Employee.find();
    const tree = buildTree(employees);
    res.status(200).json(tree);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all employees for dropdown
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addEmployee,
  getOrgTree,
  getAllEmployees,
};
