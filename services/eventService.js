
const Event = require('../models/Event');

// Create a new event
const createEvent = async (eventData) => {
    const event = new Event(eventData);
    return await event.save();
};

// Get all events
const getAllEvents = async () => {
    return await Event.find();
};

// Get a single event by ID
const getEventById = async (id) => {
    return await Event.findById(id);
};

// Update an event
const updateEvent = async (id, eventData) => {
    return await Event.findByIdAndUpdate(id, eventData, { new: true });
};

// Delete an event
const deleteEvent = async (id) => {
    return await Event.findByIdAndDelete(id);
};

module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
};
