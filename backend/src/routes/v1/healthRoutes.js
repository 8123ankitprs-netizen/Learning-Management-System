const express = require('express');
const router = express.Router();
const { getHealthStatus } = require('../../controllers/healthController');

/**
 * Route: GET /api/v1/health
 * Description: Basic health check endpoint to verify the server is running.
 * Access: Public
 */
router.get('/', getHealthStatus);

module.exports = router;
