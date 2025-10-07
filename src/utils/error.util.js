// src/utils/error.util.js

export class ApiError extends Error {
  constructor(code, publicMessage, originalError = undefined, isOperational = true, status = 400) {
    super(publicMessage);
    this.name = 'ApiError';
    this.code = typeof code === 'string' ? code : (code?.code ?? 'ERROR');
    this.publicMessage = publicMessage;
    this.originalError = originalError;
    this.isOperational = isOperational;
    this.status = status;
  }
}

export function apiError(code, message, status = 400) {
  return new ApiError(code, message, undefined, true, status);
}
