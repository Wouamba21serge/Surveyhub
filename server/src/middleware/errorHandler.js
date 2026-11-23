export function notFound(req, res) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
}

// Last safety net: never leak stack traces to the client
export function errorHandler(err, req, res, _next) {
  console.error(err);
  res.status(500).json({ message: 'Something went wrong on the server' });
}
