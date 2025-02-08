import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ToastrService } from 'ngx-toastr'; // ✅ Import Toastr for notifications

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  signInForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService // ✅ Inject Toastr for alerts
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      this.userService.signin(this.signInForm.value).subscribe(
        (res) => {
          if (res.token) {
            this.authService.saveToken(res.token);
            this.authService.saveUser(res); // ✅ Save user info
            this.toastr.success(`Welcome, ${res.firstName}!`, 'Sign-in successful 🎉');
            this.router.navigateByUrl('/dashboard');
          }
        },
        (error) => {
          this.toastr.error(error.error?.error || 'Invalid email or password!', 'Login Failed 🚫');
        }
      );
    } else {
      this.toastr.warning('Please fill in valid details.', 'Form Incomplete');
    }
  }

}
