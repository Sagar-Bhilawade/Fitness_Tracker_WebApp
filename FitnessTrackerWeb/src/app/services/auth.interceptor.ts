import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  let token: string | null = null;

  // Check if localStorage is available
  try {
    token = authService.getToken(); // Safe access through AuthService
  } catch (error) {
    console.warn('In Auth Interceptor: localStorage is not available in the current environment.');
  }

  // Clone the request and add the Authorization header if a token exists
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(clonedRequest);
  }

  // Proceed without modifying the request if no token is available
  return next(req);
};
