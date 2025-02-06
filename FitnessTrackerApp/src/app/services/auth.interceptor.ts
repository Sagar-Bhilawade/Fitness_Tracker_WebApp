import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  let token: string | null = null;

  try {
    token = authService.getToken(); // Fetch token
    console.log('Retrieved Token:', token);
  } catch (error) {
    console.warn('AuthInterceptor: Failed to retrieve token', error);
  }

  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Request with Auth Header:', clonedRequest);
    return next(clonedRequest);
  }

  console.warn('AuthInterceptor: No token found, proceeding without auth header.');
  return next(req);
};
