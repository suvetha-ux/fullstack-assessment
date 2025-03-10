const express = require('express');
const router = express.Router();
const Sale = require('../models/Sales.js');

/**
 * @swagger
 * /api/sales:
 *   post:
 *     summary: Create a new sale
 *     description: Add a new sale record to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *                 example: "Laptop"
 *               quantity:
 *                 type: number
 *                 example: 5
 *               price:
 *                 type: number
 *                 example: 1000
 *     responses:
 *       201:
 *         description: Sale added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 productName:
 *                   type: string
 *                 quantity:
 *                   type: number
 *                 price:
 *                   type: number
 *       400:
 *         description: All fields are required
 *       500:
 *         description: Failed to add sale. Please try again.
 */
router.post('/', async (req, res) => {
    const { productName, quantity, price } = req.body;

    // Validate all fields
    if (!productName || !quantity || !price) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Create the sale record
        const sale = await Sale.create({ productName, quantity, price });
        res.status(201).json(sale);
    } catch (error) {
        console.error('❌ Error adding sale:', error.message);
        res.status(500).json({
            message: 'Failed to add sale. Please try again.',
            error: error.message
        });
    }
});

/**
 * @swagger
 * /api/sales:
 *   get:
 *     summary: Retrieve all sales
 *     description: Retrieve a list of all sales records
 *     responses:
 *       200:
 *         description: Successfully retrieved sales
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   productName:
 *                     type: string
 *                   quantity:
 *                     type: number
 *                   price:
 *                     type: number
 *       500:
 *         description: Failed to fetch sales
 */
router.get('/', async (req, res) => {
    try {
        const sales = await Sale.find();
        res.status(200).json(sales);
    } catch (error) {
        console.error('❌ Error fetching sales:', error.message);
        res.status(500).json({
            message: 'Failed to fetch sales',
            error: error.message
        });
    }
});

/**
 * @swagger
 * /api/sales/{id}:
 *   delete:
 *     summary: Delete a sale by ID
 *     description: Remove a specific sale record from the database
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The sale ID
 *     responses:
 *       200:
 *         description: Sale deleted successfully
 *       404:
 *         description: Sale not found
 *       500:
 *         description: Failed to delete sale
 */
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const sale = await Sale.findByIdAndDelete(id);

        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }

        res.status(200).json({ message: 'Sale deleted successfully' });
    } catch (error) {
        console.error('❌ Error deleting sale:', error.message);
        res.status(500).json({
            message: 'Failed to delete sale',
            error: error.message
        });
    }
});

module.exports = router;