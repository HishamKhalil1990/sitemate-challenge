const express = require('express');
const vaildators = require('../validators/validators')
const issueController = require('../controllers/issueController')

const router = express.Router();

router.post('/', vaildators.validateCreateIssue, issueController.createIssue);
router.get('/', vaildators.validateGetRequest, issueController.findIssues);
router.delete('/:id', vaildators.validateDeleteIssue, issueController.deleteIssue);
router.put('/:id', vaildators.validateUpdateIssue, issueController.updateIssue);

module.exports = router;