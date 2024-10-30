// /middlewares/validation.js
const { body, validationResult } = require('express-validator');

const eventValidationRules = () => [
    body('title').isString().isLength({ max: 50 }).withMessage('Title is required and should be 50 characters max.'),
    body('date').isDate({ min: new Date().toISOString() }).withMessage(`Date must be a future date. ${new Date().toDateString()}`),
    body('location').isString().isLength({ max: 100 }).withMessage('Location is required and should be 100 characters max.'),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { eventValidationRules, validate };
