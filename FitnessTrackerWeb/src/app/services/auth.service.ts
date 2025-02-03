import { Inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private cookieService: CookieService) {}

  getToken(): string | null {
    try {
      return this.cookieService.get('token') || null; // Get the token from cookies
    } catch (error) {
      console.warn('AuthService: Error accessing cookies', error);
      return null;
    }
  }

  saveToken(token: string): void {
    try {
      this.cookieService.set('token', token, {
        expires: 7,      // Expire in 7 days
        path: '/',       // Accessible from root path
        secure: true,    // Use true in production for HTTPS
        sameSite: 'Lax', // Protect against CSRF
      });
    } catch (error) {
      console.warn('AuthService: Error setting token in cookies', error);
    }
  }

  clearToken(): void {
    try {
      this.cookieService.delete('token', '/'); // Delete the token cookie
    } catch (error) {
      console.warn('AuthService: Error clearing token from cookies', error);
    }
  }
}
