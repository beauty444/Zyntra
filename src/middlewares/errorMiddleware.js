import { ZodError } from 'zod';

import { logger } from '../config/logger.js';

export function errorMiddleware(err, _req, res, _next) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'ValidationError',
      details: err.issues
    });
  }

  const status = err.status || 500;
  const code = err.code || 'INTERNAL_ERROR';
  const message = err.publicMessage || 'Something went wrong';

  logger.error({ err, status, code }, 'Unhandled error');
  res.status(status).json({ error: code, message });
}
