# Health Motivation App - Backend

## Overview
The backend server for the Health Motivation App is built with Node.js and Express, providing a robust API for the mobile application. It handles user authentication, data persistence, and business logic for the health tracking features.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing
- **Validation**: Express Validator

## Key Features

### 1. Authentication System
- User registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Session management
- Secure cookie handling

### 2. User Management
- User profile management
- Role-based access control
- Account settings
- Password reset functionality

### 3. Health Data Management
- Activity tracking
- Progress monitoring
- Goal management
- Health metrics storage

### 4. API Endpoints
- RESTful API design
- CRUD operations
- Data validation
- Error handling

### 5. Security Features
- Input sanitization
- CORS configuration
- Rate limiting
- Data encryption

## Project Structure
```
health-motivation-backend/
├── models/          # Database models
├── routes/          # API routes
├── middleware/      # Custom middleware
├── server.js        # Main application file
└── package.json     # Project dependencies
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Detailed Installation Guide

1. **Initial Setup**
```bash
# Create a new directory and navigate into it
mkdir health-motivation-backend
cd health-motivation-backend

# Initialize a new Node.js project
npm init -y
```

2. **Core Dependencies**
```bash
# Express and related middleware
npm install express@^4.18.2
npm install body-parser@^2.2.0
npm install cors@^2.8.5
npm install cookie-parser@^1.4.7
```

3. **Database and ODM**
```bash
# MongoDB and Mongoose
npm install mongoose@^7.0.3
```

4. **Authentication and Security**
```bash
# JWT and password hashing
npm install jsonwebtoken@^9.0.0
npm install bcryptjs@^2.4.3

# Input validation
npm install validator@^13.9.0
```

5. **Environment Variables**
```bash
npm install dotenv@^16.0.3
```

6. **Development Dependencies**
```bash
# Development server with auto-reload
npm install --save-dev nodemon@^2.0.22
```

### Configuration Steps

1. **Create .env file**
```env
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

2. **Update package.json scripts**
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### Verification Steps

1. **Start MongoDB**
```bash
# On Windows
net start MongoDB

# On macOS/Linux
sudo service mongod start
```

2. **Start the Development Server**
```bash
npm run dev
```

3. **Test the Server**
```bash
curl http://localhost:3000/api/health
```

### Common Issues and Solutions

1. **MongoDB Connection Issues**
- Ensure MongoDB is running
- Check connection string in .env file
- Verify network connectivity

2. **Port Conflicts**
- Change PORT in .env file if 3000 is in use
- Check for other running Node.js processes

3. **Version Management**
- Keep track of your `package.json` files
- Use exact versions for production
- Consider using `package-lock.json` for consistent installations

4. **Security Considerations**
- Never commit `.env` files
- Keep dependencies updated
- Regularly check for security vulnerabilities:
  ```bash
  npm audit
  ```

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: User login
- `POST /api/auth/logout`: User logout
- `GET /api/auth/profile`: Get user profile

### Health Data Endpoints
- `GET /api/health/activities`: Get user activities
- `POST /api/health/activities`: Add new activity
- `PUT /api/health/activities/:id`: Update activity
- `DELETE /api/health/activities/:id`: Delete activity

### User Management Endpoints
- `GET /api/users/profile`: Get user profile
- `PUT /api/users/profile`: Update user profile
- `PUT /api/users/password`: Update password

## Dependencies
- **Core**: Express.js
- **Database**: Mongoose
- **Authentication**: jsonwebtoken, bcryptjs
- **Middleware**: cors, body-parser, cookie-parser
- **Development**: nodemon

## Development Guidelines
1. Follow RESTful API design principles
2. Implement proper error handling
3. Use middleware for common functionality
4. Write comprehensive API documentation
5. Include input validation

## Security Best Practices
- Use environment variables for sensitive data
- Implement proper authentication middleware
- Sanitize user inputs
- Use HTTPS in production
- Implement rate limiting
- Regular security audits

## Database Schema
The application uses MongoDB with the following main collections:
- Users
- Activities
- Goals
- Progress

## Error Handling
- Standardized error responses
- Proper HTTP status codes
- Detailed error messages
- Error logging

## Testing
- Unit tests for core functionality
- Integration tests for API endpoints
- Authentication testing
- Data validation testing

## Deployment
1. Set up MongoDB database
2. Configure environment variables
3. Build the application
4. Deploy to hosting platform
5. Set up SSL certificate
6. Configure domain

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
This project is licensed under the MIT License. 