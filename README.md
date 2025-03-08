# Sales Management App

This is a full-stack project built with Node.js, Express.js, React.js, and MongoDB for managing sales records. The backend is secured using JWT authentication, and the frontend allows users to add, retrieve, and manage sales records.

## Project Setup

### Backend Setup

1. Clone the repository.
2. Navigate to the backend/ directory.
3. Install the required dependencies:
    bash
    npm install
    
4. Set up environment variables by creating a .env file in the backend/ directory with the following:
    
    PORT=5000
    JWT_SECRET=your_secret_key
    
5. Start the backend server:
    bash
    npm start
    

### Frontend Setup

1. Navigate to the frontend/ directory.
2. Install the required dependencies:
    bash
    npm install
    
3. Start the frontend server:
    bash
    npm start
    

## API Documentation

All API endpoints are documented using Swagger (OpenAPI). To view the API documentation:

1. Navigate to http://localhost:5000/api-docs.

## API Endpoints

- *POST /sales* - Create a new sales record.
- *GET /sales* - Retrieve all sales records.
- *GET /sales/{id}* - Retrieve a specific sales record by ID.
- *DELETE /sales/{id}* - Delete a sales record.
- *PUT /sales/{id}* - Update a sales record (full update).
- *PATCH /sales/{id}* - Update specific fields of a sales record (partial update).

## Authentication

The API is protected with JWT authentication. Use the following credentials to log in:

- *Username*: admin
- *Password*: admin

Once logged in, a JWT token will be returned, which must be included in the Authorization header for subsequent API requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.