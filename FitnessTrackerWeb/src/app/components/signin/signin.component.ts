import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { UserService } from '../../services/user.service';
import { error } from 'console';
@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
signInForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
     this.userService.signin(this.signInForm.value).subscribe(
       res=>{
        console.log('Request succeded');

          console.log(res)
       },
       error=>{
        console.log('Request Failed');

          console.log(error);

       }
     )

      const { email, password } = this.signInForm.value;
      console.log('Sign-In Form Data:', { email, password });
      // Handle sign-in logic here
      this.signInForm.reset();
    }
  }
}
