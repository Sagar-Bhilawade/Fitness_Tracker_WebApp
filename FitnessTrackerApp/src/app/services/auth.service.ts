import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private cookieService: CookieService) {}

  getToken(): string | null {
    try {
      return this.cookieService.get('token') || null; // Get token from cookies
    } catch (error) {
      console.warn('AuthService: Error accessing token', error);
      return null;
    }
  }

  saveToken(token: string): void {
    try {
      this.cookieService.set('token', token, {
        expires: 7, // 7-day expiration
        path: '/',
        secure: location.protocol === 'https:', // Secure in HTTPS
        sameSite: 'Lax', // Adjust if working with CORS
      });
    } catch (error) {
      console.warn('AuthService: Error setting token', error);
    }
  }

  saveUser(user: any): void {
    try {
      localStorage.setItem('user', JSON.stringify(user)); // Store user details
    } catch (error) {
      console.warn('AuthService: Error storing user details', error);
    }
  }

  getUser(): any {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.warn('AuthService: Error retrieving user details', error);
      return null;
    }
  }

  clearAuth(): void {
    try {
      this.cookieService.delete('token', '/'); // Remove token
      localStorage.removeItem('user'); // Clear user data
    } catch (error) {
      console.warn('AuthService: Error clearing authentication', error);
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
