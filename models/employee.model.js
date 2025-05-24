const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  dob: { type: Date, required: true },
  experience: { type: Number, required: true },
  image: { type: String },
  reportingManager: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", default: null },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
