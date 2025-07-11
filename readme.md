# 📸 Pixisphere Backend

Pixisphere is a backend API for a photography platform that connects clients with partners (photographers). This server handles authentication, portfolio management, inquiries, reviews, moderation, and more.

## ✨ Features

### ✅ User Management

- Signup/Login using email and password

- Roles: client, partner, admin

- Passwords hashed before storing (using custom hash util)

### 📷 Partner Features

- Partner profile: name, location, price, aadharNumber, categories, tags, styles

- Portfolio (array of objects with url and description)

- Can edit, add, or delete individual portfolio items

- View inquiries that match:

   - Same city as partner's location

   - Budget ≥ partner's price

   - Category ∈ partner's categories

- Update inquiry status: new, responded, booked, closed

- Only one partner can close/book an inquiry (closedBy field)

### 🤝 Client Features

- Submit inquiry with fields: city, budget, category, date, imageUrl

- View own submitted inquiries

### ⭐ Reviews

- Create, update, delete reviews

- Linked to both userId and partnerId

- Includes rating and optional comment

- Admins can moderate reviews

### 📊 Admin Features

- View dashboard KPIs:

    - Total clients

    -  Total partners

    -  Pending verifications

    - Total inquiries

- View/update/delete reviews

- Approve/reject partners (status change)

- Category CRUD APIs

- Location CRUD APIs

### 📅 Moderation

- Approve or reject partners by changing status: pending, verified, rejected

- Restrict access to some routes using middleware (adminMiddleware, partnerMiddleware, clientMiddleware)

---

## 🌐 API Endpoints Overview

### 🔐 Auth (/api/auth)

| Method     | Endpoint     | Description   |
|----------|----------|------------|
| POST    | /signup| Register a user      |
| POST     | /login | Login     |



### 🧑‍💼 Partners (/api/partner)

| Method     | Endpoint     | Description   |
|----------|----------|------------|
|    GET      |    /      |      List all partners       |
|   POST       |     /     |      Create new partner       |
|     POST     |     /portfolio/:id     |    Add a portfolio item     |
|     PUT     |     /portfolio/:id/:index   | Edit a specific portfolio item |
|  DELETE        |  /portfolio/:id/:index|Delete a specific portfolio item|
|   GET       |    /leads      |  Get matched inquiries (leads)  |
|   PUT       |    /leads/:id      | Update inquiry status (booked/closed)   |



### 📨 Inquiries (/api/inquiry)

| Method     | Endpoint     | Description   |
|----------|----------|------------|
|      POST    |   /       |    Submit an inquiry (client)       |


### ⭐ Reviews (/api/review)

| Method     | Endpoint     | Description   |
|----------|----------|------------|
|   POST       |    /      |      Submit a review       |
|    GET      |     /     |       Get all reviews      |
|    GET      |   /partner/:id       |  Get reviews for a partner   |
|    PUT      |   /:id  |Update a review      |
|    DELETE      |    /:id      | Delete a review|



### 👤 Admin Panel (/api/admin)

| Method     | Endpoint     | Description   |
|----------|----------|------------|
|   GET   |  /    |  Get KPIs summary     |
|  GET    |  /verification    |   View pending partner verifications    |
|   PUT   |  /verify/:id    |Approve/reject partner       |
|   GET   |   /reviews   |  View all reviews     |
|PUT    |  /review/:id    | Update a review      |
|DELETE      | /review/:id     | Delete a review      |
| POST     | /category     |Create a category       |
|   GET   |  /category    | Get all categories      |
|   PUT   |/category/:id      |Update a category       |
| DELETE     |/category/:id      |  Delete a category     |
| POST     |  /location    | Create a location      |
| GET     |  /location    |Get all locations       |
| PUT     |/location/:id      | Update a location      |
| DELETE     |  /location/:id    |Delete a location       |
      

---

## ⚖️ Role-Based Access

| Middleware     | Description     |
|----------|----------|
|adminMiddleware      | Only allows access to admins     |       
|partnerMiddleware      | Only allows partners     | 
|clientMiddleware      |Only allows clients      | 


---



## ⚙️ Setup Instructions

#### ὒ7 Prerequisites

- Node.js v16+

- MongoDB (Atlas or local)

- Postman for testing APIs

### 🔄 Installation

git clone https://github.com/yourusername/pixisphere-backend.git
cd pixisphere-backend
npm install

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

Run the server:

npm start

Server runs at http://localhost:3000

---

## 🔍 API Testing

Use this Postman collection:

✉️ [Click to open Pixisphere Postman Collection]( https://cloudy-station-159893.postman.co/workspace/My-Workspace~4c5469b0-a603-4880-8acc-d620e5499494/collection/22654952-7a3f23d0-a519-4fc6-a99a-ceaf7b38d7df?action=share&source=copy-link&creator=22654952)

- Includes requests for:

    - Auth

    - Partner CRUD

    - Inquiries

    - Reviews

    - Categories & Locations

    - Admin Dashboard APIs


--- 

## 📚 License

MIT License

## 👤 Author

#### Rajat Sharma

