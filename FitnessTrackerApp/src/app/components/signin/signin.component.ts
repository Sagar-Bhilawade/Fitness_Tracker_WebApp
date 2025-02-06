import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  signInForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private authService: AuthService, private router: Router) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      this.userService.signin(this.signInForm.value).subscribe(
        (res) => {
          console.log('Request succeeded');
          console.log(res);
          this.authService.saveToken(res.token)
          this.router.navigateByUrl('/dashboard')
        },
        (error) => {
          console.log('Request Failed');
          console.log(error);
        }
      );

      const { email, password } = this.signInForm.value;
      console.log('Sign-In Form Data:', { email, password });

      // Handle sign-in logic here
      this.signInForm.reset();
    }
  }
}
