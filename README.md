# Organization Tree Backend

Node.js + Express API for managing an organizational chart, with MongoDB (Mongoose) for data storage and Multer for image uploads.

---

## 🚀 Features

* **RESTful Endpoints**: Create, read, and list employees.
* **Hierarchical Data**: Builds a nested tree of employees based on reporting manager.
* **File Upload**: Accepts profile images (PNG, JPG, JPEG) with size validation (max 1 MB).
* **Data Validation & Error Handling**: Ensures required fields and returns clear HTTP status codes.
* **Seed Data**: Optional `seed.js` for populating sample employees.

---

## 📦 Project Structure

```bash
org-tree-backend/
├── config/
│   └── db.js                  # MongoDB connection setup
│   └── cloudinary.js          # For an free image upload service 
├── controllers/
│   └── employeeController.js  # Business logic & tree building
├── models/
│   └── employee.model.js      # Mongoose schema for Employee
├── routes/
│   └── employees.js           # Express routes for API endpoints
├── uploads/                   # Folder for uploaded images
├── seed.js                    # Optional script to seed sample data
├── server.js                  # Express application entry point
├── .env                       # Environment variables (MONGO_URI, PORT)
├── package.json
└── README.md                  # (this file)
```

---

## 🛠 Prerequisites

* **Node.js** (v14+) and **npm** or **Yarn**
* **MongoDB** instance (local or hosted)

---

## ⚙️ Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/mankarshubham81/org-tree-backend.git
   cd org-tree-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or yarn install
   ```

3. **Environment Variables**
   Create a `.env` file in the project root:

   ```dotenv
   MONGO_URI=mongodb://localhost:27017/org-tree
   PORT=4000
   ```

4. **Run the server**

   ```bash
   npm start
   # or yarn start
   ```

   The API will be available at `http://localhost:4000/api/employees`

5. **Seed sample data** (optional)

   ```bash
   node seed.js
   ```

---

## 📋 API Endpoints

| Method | Endpoint              | Description                              |
| ------ | --------------------- | ---------------------------------------- |
| GET    | `/api/employees`      | List all employees (flat array)          |
| GET    | `/api/employees/tree` | Get hierarchical tree of employees       |
| POST   | `/api/employees`      | Add a new employee (multipart/form-data) |

### Example: Add Employee

```
POST /api/employees
Content-Type: multipart/form-data

Fields:
- name: String
- designation: String
- dob: YYYY-MM-DD
- experience: Number
- reportingManager: ObjectId (optional)
- image: File (PNG, JPG, JPEG; max 1 MB)
```

Response: `201 Created` with JSON of the new employee.

---

## 🔧 Seed Script

The `seed.js` script clears the `employees` collection and inserts sample data with a hierarchy.

```bash
node seed.js
```

Customize `seed.js` to adjust sample names, designations, and reporting relationships.

---

## 📄 License

MIT © Your Name
