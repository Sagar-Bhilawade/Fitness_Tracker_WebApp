import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports:[SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'FitnessTrackerApp';

  constructor(private router: Router, private authService: AuthService) {}

  isAuthPage(): boolean {
    return this.router.url === '/signin' || this.router.url === '/signup' || this.router.url === '/' ;
  }

  logout(): void {
    this.authService.clearAuth(); // Clear token
    this.router.navigateByUrl('/signin'); // Redirect to Sign In
  }
}
