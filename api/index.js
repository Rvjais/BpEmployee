const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27018/bp_employee';

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB successfully'))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:');
    console.error(err);
  });

// Employee Schema
const employeeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  dept: { type: String, required: true },
  image: { type: String, required: true },
  votes: { type: Number, default: 0 }
});

const Employee = mongoose.model('Employee', employeeSchema);

// API Endpoints
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/employees/:id/vote', async (req, res) => {
  const { direction } = req.body; // 'right' for positive, 'left' for negative
  const increment = direction === 'right' ? 1 : -1;

  try {
    const employee = await Employee.findOneAndUpdate(
      { id: req.params.id },
      { $inc: { votes: increment } },
      { new: true }
    );
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = app;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
