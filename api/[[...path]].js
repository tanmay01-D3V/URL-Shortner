/**
 * Vercel Serverless Function: Catch-all handler for /api/* routes.
 * Exports the Express backend so all API requests are handled by it.
 */
module.exports = require('../backend/index');
