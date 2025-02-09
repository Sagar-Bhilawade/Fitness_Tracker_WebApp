import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null); // Stores user info in real-time
  user$: Observable<any> = this.userSubject.asObservable(); // Exposes user state

  constructor(private cookieService: CookieService,@Inject(PLATFORM_ID) private platformId: object) {
    this.loadUserFromStorage(); // Load user on startup
  }

  // ✅ Fetch token from cookies
  getToken(): string | null {
    try {
      return this.cookieService.get('token') || null;
    } catch (error) {
      console.warn('AuthService: Error accessing token', error);
      return null;
    }
  }

  // ✅ Save token securely in cookies
  saveToken(token: string): void {
    try {
      this.cookieService.set('token', token, {
        expires: 7, // Expires in 7 days
        path: '/',
        secure: location.protocol === 'https:', // Secure in HTTPS only
        sameSite: 'Lax',
      });
    } catch (error) {
      console.warn('AuthService: Error setting token', error);
    }
  }

  // ✅ Save user details safely in localStorage
  saveUser(user: any): void {
    try {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user); // Notify all subscribers
      }
    } catch (error) {
      console.warn('AuthService: Error storing user details', error);
    }
  }

  // ✅ Get user from localStorage safely
  getUser(): any {
    return this.userSubject.value;
  }

  // ✅ Check if user is logged in based on token
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // ✅ Clear user authentication (logout)
  clearAuth(): void {
    try {
      this.cookieService.delete('token', '/'); // Remove token
      localStorage.removeItem('user'); // Clear user data
      this.userSubject.next(null); // Notify all subscribers
    } catch (error) {
      console.warn('AuthService: Error clearing authentication', error);
    }
  }

  // ✅ Load user from localStorage safely
  private loadUserFromStorage(): void {
    try {
      if (isPlatformBrowser(this.platformId)) { // ✅ Only access localStorage in browser
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          this.userSubject.next(JSON.parse(storedUser));
        }
      }
    } catch (error) {
      console.warn('AuthService: Error loading user from storage', error);
      this.userSubject.next(null);
    }
  }
}
