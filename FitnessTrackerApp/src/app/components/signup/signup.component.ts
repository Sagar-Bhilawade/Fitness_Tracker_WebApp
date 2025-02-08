import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ToastrService } from 'ngx-toastr'; // Import Toastr for notifications

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService // Inject ToastrService for notifications
  ) {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      this.userService.signup(this.signUpForm.value).subscribe(
        (res) => {
          console.log('Signup Request Succeeded:', res);
          this.toastr.success('Signup succeeded!', 'Success'); // Show success toast
          this.router.navigateByUrl('/signin'); // Redirect to Sign In page
        },
        (error) => {
          console.log('Signup Request Failed:', error);
          this.toastr.error('Signup failed. Please try again.', 'Error'); // Show error toast
        }
      );

      console.log('Signup Form Data:', this.signUpForm.value);
      this.signUpForm.reset();
    }
  }
}
