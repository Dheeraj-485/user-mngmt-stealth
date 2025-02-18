# User Management System (MERN Stack)

## FOR LOGIN :-
# ADMIN Credentials: email:admin@gmail.com password: 12345678
# Normal User credentials:- email: demo@gmail.com  12345678

This is a **User Management System** built using the **MERN stack** (MongoDB, Express, React, and Node.js). It provides authentication, CRUD operations, and protected routes.

## Features
- User authentication (Signup/Login with JWT)
- CRUD operations for managing users
- Protected routes for authorized users
- Role-based access control (RBAC)
- Data validation with Joi
- Secure password storage with bcrypt

## Tech Stack
### Frontend (Client)
- React.js
- Tailwind CSS
- React Hook Form
- React Router

### Backend (Server)
- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication
- Joi for validation
- bcrypt for password hashing

---

## Project Setup

### 1. Clone the Repository
git clone https://github.com/Dheeraj-485/user-mngmt-stealth.git
cd user-mngmt-stealth-main

### 2. Install Dependencies
#### Backend Setup
cd server
npm install

#### Frontend Setup
cd ../client
npm install

### 3. Environment Variables
Create a `.env` file inside the `server/` directory and add the following:
```env
PORT=8080
MONGO_URL=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
EMAIL_USER=your_email
EMAIL_PASSWORD=your_password For nodemailer email send
```

## 4. Run the Project
#### Start Backend
cd server
npm start

#### Start Frontend
cd client
npm run dev

The application should now be running at `http://localhost:5173/` (default Vite port). And also runs on `https://user-mngmt-stealth.vercel.app/` globally

---

## API Documentation

### Base URL:
```
http://localhost:8080/api
```

### Authentication Routes
#### 1. Register User **You can only signup and default role is user ,as admin needs to be created manually in the database,or we will findout another way to signup admin in future**
**POST** `http://localhost:8080/auth/signup`
##### Request Body:
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123"
}
```
##### Response:
```json
{
  "message": "User registered successfully",
  doc:user
}
```

#### 2. Login User
**POST** `/auth/login`
##### Request Body:
```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```
##### Response:
```json
{
  "message": "Login successful",
  "token": "<jwt-token>"
}
```

### User Management Routes (Protected)
#### 3. Get All Users (Admin Only)
   **POST** `/users/
##### Request Body:
```json
{
"name":"demoUser"
  "email": "demoUser@gmail.com",
}
```
  ##### Response:
 {
    "message": "User created successfully. Temporary password sent to email.",
    "doc": {
        "name": "demoUser",
        "email": "ksilent528@gmail.com",
        "password": "$2b$10$F2gDSuZCpNJt5fQUPNZs6ex7RTsVSkk4SjR5y3bzPBl5TnpvyYV.G",
        "role": "user",
        "_id": "67b43289f1fc2b5563377b82",
        "__v": 0
    }
}

**GET** `/users`
**Headers:**
```
Authorization: Bearer <jwt-token>
```


##### Response:
```json
[
  {
    "_id": "12345",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "role": "user"
  }
]
```

#### 4. Update User
**PUT** `/users/:id`
##### Request Body:
```json
{
  "name": "Updated Name"
}
```
##### Response:
```json
{
  "message": "User updated successfully"
}
```

#### 5. Delete User (Admin Only)
**DELETE** `/users/:id`
##### Response:
```json
{
  "message": "User deleted successfully"
}
```

---

## Additional Features (Bonus)
- Rate limiting to prevent brute-force attacks
- Password reset functionality
- Role-based access control for different user roles

## Folder Structure
```
user-mngmt-stealth-main/
├── client/    # React frontend
├── server/    # Node.js backend
│   ├── config/        # Config files (DB, env, etc.)
│   ├── controllers/   # API logic
│   ├── middlewares/   # Authentication & validation
│   ├── models/        # Mongoose schemas
│   ├── routes/        # API routes
│   ├── utils/         # Utility functions
│   ├── server.js      # Entry point
```

## Conclusion
This project is a fully functional **User Management System** with authentication, role-based access, and secure API handling. It follows best practices for security and performance.

For any questions, feel free to reach out!
