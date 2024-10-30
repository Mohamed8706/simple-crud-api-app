const express = require('express');
const router = express.Router();
const { eventValidationRules, validate } = require('../middlewares/validation');
const eventService = require('../services/eventService');
const { getPagination, getPaginationMeta } = require('../utils/paginationUtils');
const { sendSuccess, sendError } = require('../utils/responseUtils');

// Create a new event
router.post('/', eventValidationRules(), validate, async (req, res) => {
    try {
        const event = await eventService.createEvent(req.body);
        res.status(201).json({ success: true, data: event });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get all events with pagination
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        // Use pagination utility to calculate skip and limit values
        const { skip, limit: itemsPerPage, currentPage } = getPagination(page, limit);

        // Fetch paginated results from database
        const { events, totalItems } = await eventService.getAllEvents(skip, itemsPerPage);

        // Use pagination metadata utility to get total pages.
        const paginationMeta = getPaginationMeta(totalItems, currentPage, itemsPerPage);

        sendSuccess(res, { events, pagination: paginationMeta });
    } catch (error) {
        sendError(res, error.message);
    }
});

// Get a single event by ID
router.get('/:id', async (req, res) => {
    try {
        const event = await eventService.getEventById(req.params.id);
        if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
        res.json({ success: true, data: event });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Update an event by ID
router.put('/:id', eventValidationRules(), validate, async (req, res) => {
    try {
        const event = await eventService.updateEvent(req.params.id, req.body);
        if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
        res.json({ success: true, data: event });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Delete an event by ID
router.delete('/:id', async (req, res) => {
    try {
        const event = await eventService.deleteEvent(req.params.id);
        if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
        res.json({ success: true, data: event });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
