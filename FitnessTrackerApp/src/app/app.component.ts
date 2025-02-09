import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'FitnessTrackerApp';
  userName: string = 'Guest';

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.userName = user ? `${user.firstName} ${user.lastName}` : 'Guest';
    });
  }

  isAuthPage(): boolean {
    return this.router.url === '/signin' || this.router.url === '/signup' || this.router.url === '/';
  }

  logout(): void {
    this.authService.clearAuth(); // Clear token
    this.router.navigateByUrl('/signin'); // Redirect to Sign In
  }

  loadUserName(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        this.userName = `${parsedUser.firstName} ${parsedUser.lastName}`;
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }
}
