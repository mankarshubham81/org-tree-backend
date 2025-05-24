# Org-Tree Solution

## Overview
This mono-repo contains two separate projects:

1. **org-tree-frontend**: React app, Redux Toolkit, Axios, react-d3-tree.
2. **org-tree-backend**: Express API, MongoDB/Mongoose, Multer file uploads.

---

## Frontend Patterns

- **Redux Toolkit**: Simplifies slice & asyncThunk patterns.
- **Folder separation**:
  - `api/`  – low-level HTTP calls (axios).
  - `app/`  – store configuration.
  - `features/` – domain logic (state + thunks).
  - `components/` – “dumb” UI + form.
- **React-Modal** for popups, **react-d3-tree** for tree layout.

---

## Backend Patterns

- **MVC-light**:
  - `models/`  – Mongoose schemas.
  - `controllers/` – business logic.
  - `routes/`   – HTTP endpoints + middleware.
- **Multer** guards file size & type.
- **Flat→Tree** conversion in controller for one API call.

---

## Running

1. **Backend**  
   ```bash
   cd org-tree-backend
   echo "MONGODB_URI=your_uri" > .env
   npm install
   node app.js
