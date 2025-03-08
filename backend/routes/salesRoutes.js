const express = require('express');
const router = express.Router();
const Sale = require('../models/Sales.js');

// @desc    Create a new sale
// @route   POST /api/sales
// @access  Public
router.post('/', async (req, res) => {
    const { productName, quantity, price } = req.body;

    if (!productName || !quantity || !price) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const sale = await Sale.create({ productName, quantity, price });
        res.status(201).json(sale);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add sale. Please try again.' });
    }
});

// @desc    Get all sales
// @route   GET /api/sales
// @access  Public
router.get('/', async (req, res) => {
    try {
        const sales = await Sale.find();
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch sales' });
    }
});

// @desc    Get a sale by ID
// @route   GET /api/sales/:id
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const sale = await Sale.findById(req.params.id);
        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }
        res.status(200).json(sale);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch sale' });
    }
});

// @desc    Update a sale by ID
// @route   PUT /api/sales/:id
// @access  Public
router.put('/:id', async (req, res) => {
    try {
        const sale = await Sale.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }
        res.status(200).json(sale);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update sale' });
    }
});

// @desc    Delete a sale by ID
// @route   DELETE /api/sales/:id
// @access  Public
router.delete('/:id', async (req, res) => {
    try {
        const sale = await Sale.findByIdAndDelete(req.params.id);
        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }
        res.status(200).json({ message: 'Sale deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete sale' });
    }
});

module.exports = router;