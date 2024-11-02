const { body, validationResult } = require('express-validator');

const eventValidationRules = () => [
    body('title')
        .isString().withMessage('Title must be a string.')
        .notEmpty().withMessage('Title is required.')
        .isLength({ max: 50 }).withMessage('Title should be 50 characters max.'),

    body('date')
        .isISO8601().withMessage('Date must be in a valid format (YYYY-MM-DD).')
        .custom((value) => new Date(value) > new Date()).withMessage('Date must be a future date.'),

    body('location')
        .isString().withMessage('Location must be a string.')
        .notEmpty().withMessage('Location is required.')
        .isLength({ max: 100 }).withMessage('Location should be 100 characters max.'),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { eventValidationRules, validate };
