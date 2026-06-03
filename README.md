# Ecommerce Web Design

A full-stack Ecommerce web application built with Node.js, Express.js, MongoDB, and EJS.

## Features

### User Features

* User Authentication (Register/Login/Logout)
* Product Listing with Pagination
* Product Search
* Product Filtering
* Product Sorting
* Product Details Page
* Product Reviews & Ratings
* Wishlist Management
* Shopping Cart
* Order Creation
* Order History
* User Profile

### Admin Features

* Add Products
* Update Products
* Delete Products
* Dashboard Management
* Inventory Management

## Technologies Used

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Cookie Parser

### Frontend

* EJS
* HTML5
* CSS3
* JavaScript

## Installation

1. Clone the repository

```bash
(https://github.com/karimkmsa/Ecommerce-Web-Design.git)`

2. Install dependencies

```bash
npm install
```

3. Create a .env file

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000
```

4. Run the application

```bash
npm start
```

The application will run on:

```text
http://localhost:3000
```

## Project Structure

```text
├── dataBase
├── public
├── uploads
├── views
├── src
│   ├── modules
│   │   ├── product
│   │   ├── user
│   │   ├── cart
│   │   ├── order
│   │   ├── checkout
│   │   └── wishlist
│   └── utils
├── index.js
└── package.json
```

## Future Improvements

* Online Payment Integration
* Cloudinary Image Upload
* Admin Analytics Dashboard
* Product Recommendations
* Email Notifications
  ## Admin Account

A default admin account is automatically created when the application starts for the first time.

### Admin Credentials

```text
Email: admin@example.com
Password: admin123
```

### Admin Features

* Add New Products
* Edit Products
* Delete Products
* Manage Inventory
* Access Dashboard
* View Orders
* Monitor Store Activity

### Security Note

For production deployment, change the default admin credentials immediately and store them securely using environment variables.
## Admin Account

Create the following environment variables:

```env
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```

The application will automatically create the admin account if it does not already exist.

## Author

Karim Khaled


