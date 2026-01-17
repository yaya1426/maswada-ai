import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Enhanced error logging
  console.error('=== ERROR OCCURRED ===');
  console.error('Path:', req.method, req.path);
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);
  console.error('=====================');

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    console.error('[Validation Error] Details:', err.errors);
    res.status(400).json({
      error: 'Validation failed',
      details: err.errors.map((e) => ({
        path: e.path.join('.'),
        message: e.message,
      })),
    });
    return;
  }

  // Handle operational errors
  if (err instanceof AppError) {
    console.error(`[App Error] ${err.statusCode}: ${err.message}`);
    res.status(err.statusCode).json({
      error: err.message,
    });
    return;
  }

  // Handle unknown errors
  console.error('[Unknown Error] Sending 500 response');
  res.status(500).json({
    error: 'Internal server error',
  });
}
