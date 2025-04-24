# School Laptop Tracking and Borrowing System

A web-based application designed to manage and track school laptops, handling borrowing transactions, user management, and activity logging.

## Features

- **Laptop Management**: Add, edit, view, and delete laptop inventory
- **User Management**: Manage students and staff who can borrow laptops
- **Borrowing System**: Track laptop borrowing and returns
- **Dashboard**: Visual overview of system statistics
- **Activity Logging**: Track all transactions and administrative actions

## Tech Stack

### Frontend
- React
- React Router
- Axios for API requests
- CSS for styling

### Backend
- Node.js with Express
- MySQL database
- RESTful API architecture

## Project Structure

```
project/
├── client/               # Frontend React application
│   ├── public/           # Static files
│   └── src/              # React source code
│       ├── components/   # Reusable UI components
│       ├── pages/        # Page components
│       ├── assets/       # Images and other assets
│       └── ...
└── server/               # Backend Node.js application
    ├── controllers/      # Request handlers
    ├── models/           # Database models
    ├── routes/           # API routes
    ├── db/               # Database configuration
    └── ...
```

## Getting Started

### Prerequisites
- Node.js (v14+)
- MySQL

### Installation

1. Clone the repository
   ```
   git clone https://github.com/your-username/school-laptop-tracking.git
   ```

2. Install server dependencies
   ```
   cd server
   npm install
   ```

3. Install client dependencies
   ```
   cd ../client
   npm install
   ```

4. Set up the database
   - Create a MySQL database
   - Run the SQL script in `server/db/schema.sql`

5. Configure environment variables
   - Create a `.env` file in the server directory
   - Add the following variables:
     ```
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=your_password
     DB_NAME=laptop_tracking_system
     PORT=5000
     ```

### Running the Application

1. Start the server
   ```
   cd server
   npm run dev
   ```

2. Start the client
   ```
   cd ../client
   npm run dev
   ```

3. Access the application at `http://localhost:5173`

## Default Login
- Username: admin
- Password: admin123

## License
[MIT](LICENSE) 