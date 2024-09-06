const { validationResult } = require('express-validator');
const mongodb = require('../utils/mongodb');

const createIssue = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 'failed', errors: errors.array() });
        }
        const data = req.body;
        const result = await mongodb.createNew(data);
        res.status(200).json({ status: 'success', msg: 'Issue created successfully', result });
    } catch (err) {
        res.status(500).json({ status: 'failed', errors: 'Internal server error' });
    }
};

const updateIssue = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 'failed', errors: errors.array() });
        }
        const { id } = req.params;
        const data = req.body;
        const result = await mongodb.updateByID(id, data);
        if (!result) {
            return res.status(404).json({ status: 'failed', errors: 'Issue not found' });
        }
        res.status(200).json({ status: 'success', msg: 'Issue updated successfully', result });
    } catch (err) {
        res.status(500).json({ status: 'failed', errors: 'Internal server error' });
    }
};

const deleteIssue = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 'failed', errors: errors.array() });
        }
        const { id } = req.params;
        const result = await mongodb.deleteByID(id);
        if (!result) {
            return res.status(404).json({ status: 'failed', msg: 'Issue not found' });
        }
        res.status(200).json({ status: 'success', msg: 'Issue deleted successfully' });
    } catch (err) {
        res.status(500).json({ status: 'failed', errors: 'Internal server error' });
    }
};

const findIssues = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 'failed', errors: errors.array() });
        }
        const { id } = req.query;
        const result = await mongodb.findAll(id);
        if (!result) {
            return res.status(404).json({ status: 'failed', errors: 'Issue not found' });
        }
        res.status(200).json({ status: 'success', quantity: id ? 'one' : 'all', result });
    } catch (err) {
        res.status(500).json({ status: 'failed', errors: 'Internal server error' });
    }
};

module.exports = {
    createIssue,
    updateIssue,
    deleteIssue,
    findIssues
};
