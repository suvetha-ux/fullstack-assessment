const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController'); // Ensure this file exists

// Create a new sales record
router.post('/', salesController.createSale);

// Retrieve all sales records
router.get('/', salesController.getAllSales);

// Retrieve a specific sales record by ID
router.get('/:id', salesController.getSaleById);

// Update a sales record (full update)
router.put('/:id', salesController.updateSale);

// Partially update a sales record
router.patch('/:id', salesController.partialUpdateSale);

// Delete a sales record
router.delete('/:id', salesController.deleteSale);

module.exports = router;