const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const salesRoutes = require('./routes/salesRoutes');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ MongoDB Connected');
}).catch(err => {
    console.log('❌ MongoDB Connection Failed:', err);
});

// Swagger Configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Sales Management API',
            version: '1.0.0',
            description: 'API documentation for managing sales records'
        },
        servers: [
            {
                url: 'http://localhost:5000'
            }
        ]
    },
    apis: [path.join(__dirname, './routes/*.js')] // This will correctly find the route files
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Home Route
app.get('/', (req, res) => {
    res.send(`
        <h1>🚀 Sales Management API</h1>
        <p><a href="/api-docs">Go to API Documentation</a></p>
    `);
});

// Routes
app.use('/api/sales', salesRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));