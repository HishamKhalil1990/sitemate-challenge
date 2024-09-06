const { body, param, query } = require('express-validator');

const validateGetRequest = [
  query('id')
    .optional()
    .isMongoId().withMessage('Invalid issue ID')
];

const validateCreateIssue = [
  body('title')
    .isString().withMessage('Title must be a string')
    .isLength({ min: 2, max: 30 }).withMessage('Title must be between 2 and 30 characters')
    .notEmpty().withMessage('Title is required'),
  
  body('description')
    .isString().withMessage('Description must be a string')
    .isLength({ min: 20, max: 200 }).withMessage('Description must be between 20 and 200 characters')
    .notEmpty().withMessage('Description is required')
];

const validateUpdateIssue = [
  param('id')
    .isMongoId().withMessage('Invalid issue ID'),

  body('title')
    .optional()
    .isString().withMessage('Title must be a string')
    .isLength({ min: 2, max: 30 }).withMessage('Title must be between 2 and 30 characters'),
  
  body('description')
    .optional()
    .isString().withMessage('Description must be a string')
    .isLength({ min: 20, max: 200 }).withMessage('Description must be between 20 and 200 characters')
];

const validateDeleteIssue = [
  param('id')
    .isMongoId().withMessage('Invalid issue ID')
];

module.exports = {
  validateGetRequest,
  validateCreateIssue,
  validateUpdateIssue,
  validateDeleteIssue
};