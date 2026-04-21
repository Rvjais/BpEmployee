const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_UR;

const employeesData = [
  { id: "BP-001", name: "Admin Pioneer", role: "Super Admin", dept: "Operations", image: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=BP-001" },
  { id: "BP-002", name: "Himanshu", role: "Manager", dept: "Operations", image: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=BP-002" },
  { id: "BP-003", name: "Sami", role: "Freelancer", dept: "Social", image: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=BP-003" },
  { id: "BP-004", name: "Satyam", role: "Employee", dept: "SEO", image: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=BP-004" },
  { id: "BP-005", name: "Ankit", role: "Employee", dept: "Ads", image: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=BP-005" },
  { id: "BP-006", name: "Pravesh", role: "Employee", dept: "Operations", image: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=BP-006" },
  { id: "BP-007", name: "Suraj", role: "Employee", dept: "SEO", image: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=BP-007" },
  { id: "BP-008", name: "Pragati", role: "Employee", dept: "SEO", image: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=BP-008" },
  { id: "BP-009", name: "Shivam", role: "Employee", dept: "Web", image: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=BP-009" },
  { id: "BP-010", name: "Inder", role: "Freelancer", dept: "Social", image: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=BP-010" },
  { id: "BP-011", name: "Aditi", role: "Employee", dept: "Operations", image: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=BP-011" },
  { id: "BP-012", name: "Ansh", role: "Freelancer", dept: "SEO", image: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=BP-012" },
  { id: "BP-013", name: "Chitransh", role: "Employee", dept: "Web", image: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=BP-013" },
  { id: "BP-014", name: "Taran", role: "Employee", dept: "Social", image: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=BP-014" },
  { id: "BP-015", name: "Aniket", role: "Employee", dept: "Ads", image: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=BP-015" },
  { id: "BP-016", name: "Kishan", role: "Employee", dept: "SEO", image: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=BP-016" },
  { id: "BP-017", name: "Om", role: "HR", dept: "HR", image: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=BP-017" },
  { id: "BP-018", name: "Ichha", role: "Employee", dept: "Operations", image: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=BP-018" },
  { id: "BP-019", name: "Harsh", role: "Employee", dept: "SEO", image: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=BP-019" },
  { id: "BP-020", name: "Sourav", role: "Employee", dept: "SEO", image: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=BP-020" },
  { id: "BP-021", name: "Nitesh", role: "Employee", dept: "Social", image: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=BP-021" },
  { id: "BP-022", name: "Tanmay", role: "Intern", dept: "Design", image: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=BP-022" },
  { id: "BP-023", name: "Priya Bisht", role: "HR", dept: "HR", image: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=BP-023" },
  { id: "BP-024", name: "Ravi Prakash", role: "Freelancer", dept: "Social", image: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=BP-024" },
  { id: "BP-025", name: "Vinay Kumar", role: "Freelancer", dept: "Social", image: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=BP-025" },
  { id: "BP-026", name: "Abhishek Kumar Yadav", role: "Sales", dept: "Sales", image: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=BP-026" },
  { id: "BP-027", name: "Kushal Khanna", role: "Freelancer", dept: "Social", image: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=BP-027" },
  { id: "BP-028", name: "Maroofe Aalam", role: "Accounts", dept: "Accounts", image: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=BP-028" },
  { id: "BP-029", name: "Ranveer Jaiswal", role: "Intern", dept: "Web", image: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=BP-029" },
  { id: "BP-030", name: "Tarun", role: "Freelancer", dept: "Social", image: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=BP-030" },
  { id: "BP-031", name: "Aman", role: "Freelancer", dept: "Social", image: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=BP-031" },
  { id: "BP-032", name: "Yash Agrawal", role: "Freelancer", dept: "Social", image: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=BP-032" },
  { id: "BP-033", name: "Manish Kushwaha", role: "Manager", dept: "Web", image: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=BP-033" },
  { id: "BP-885", name: "Tannu Yadav", role: "Employee", dept: "Social", image: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=BP-885" },
  { id: "BP-886", name: "Roshan Jaiswal", role: "Intern", dept: "SEO", image: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=BP-886" },
];

const employeeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  dept: { type: String, required: true },
  image: { type: String, required: true },
  votes: { type: Number, default: 0 }
});

const Employee = mongoose.model('Employee', employeeSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await Employee.deleteMany({});
    console.log('Cleared existing employees');

    // Insert new data
    await Employee.insertMany(employeesData);
    console.log('Successfully seeded 35 employees');

    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
