import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID to detect browser
  ) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.toastr.error('You must sign in to access this page!', 'Access Denied');

      this.router.navigate(['/signin']).then(() => {
        setTimeout(() => {
          if (isPlatformBrowser(this.platformId)) {
            window.location.reload(); // ✅ Only execute in the browser
          }
        }, 500); // ⏳ Adjust delay if needed
      });

      return false;
    }
  }
}
