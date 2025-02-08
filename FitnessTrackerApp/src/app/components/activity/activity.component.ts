import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr'; // ✅ Import ToastrService

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  activityForm!: FormGroup;
  activities: any[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService // ✅ Inject ToastrService
  ) {}

  ngOnInit(): void {
    this.activityForm = this.fb.group({
      caloriesBurned: [null, [Validators.required, Validators.min(1)]],
      steps: [null, [Validators.required, Validators.min(1)]],
      distance: [null, [Validators.required, Validators.min(0.1)]],
      date: [null, [Validators.required]]
    });

    this.getAllActivities();
  }

  // ✅ Submit Form with Toaster Notifications
  submitForm() {
    if (this.activityForm.invalid) {
      this.toastr.warning('Please fill in all required fields.', 'Warning'); // ⚠️ Warning
      return;
    }

    this.userService.postActivity(this.activityForm.value).subscribe(
      res => {
        this.toastr.success('Activity posted successfully!', 'Success'); // ✅ Success Message
        this.activityForm.reset();
        this.getAllActivities();
      },
      error => {
        this.toastr.error('Error while posting activity. Please try again.', 'Error'); // ❌ Error Message
      }
    );
  }

  // ✅ Fetch Activities with Error Handling
  getAllActivities() {
    this.userService.getActivities().subscribe(
      res => {
        this.activities = res;
      },
      error => {
        this.toastr.error('Error fetching activities. Please try again.', 'Error'); // ❌ Error Message
      }
    );
  }
}
