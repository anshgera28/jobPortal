# Job Portal

A full-stack job portal application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- User authentication (Job Seeker and Employer roles)
- Job posting and application system
- Profile management
- Job search and filtering
- Responsive design

## Tech Stack

- Frontend: React.js, Vite
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/anshgera28/jobPortal.git
cd job-portal
```

2. Install dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables
- Create a `.env` file in the backend directory
- Add the following variables:
  ```
  PORT=8000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  ```

4. Start the development servers
```bash
# Start backend server (from backend directory)
npm run dev

# Start frontend server (from frontend directory)
npm run dev
```

## License

This project is licensed under the MIT License.
