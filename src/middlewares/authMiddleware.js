import { env } from '../config/env.js';

export function apiKeyAuth(req, res, next) {
  if (!env.API_KEY) return next();
  const provided = req.header('X-API-Key');
  if (provided && provided === env.API_KEY) return next();
  return res.status(401).json({ error: 'UNAUTHORIZED' });
}
