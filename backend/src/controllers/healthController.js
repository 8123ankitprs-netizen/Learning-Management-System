/**
 * Purpose: Handle requests for the /api/v1/health endpoint
 * Why it exists: Abstracting request logic out of the route files keeps our application clean, testable, and strictly adheres to MVC architecture.
 */

const getHealthStatus = (req, res) => {
  // In a full production app, this might check DB connection status via a Service layer.
  res.status(200).json({
    success: true,
    message: 'SkillHub API is up and running smoothly 🚀',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
};

module.exports = {
  getHealthStatus
};
