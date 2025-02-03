import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  activityForm!: FormGroup;
  activities: any[] = [];

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.activityForm = this.fb.group({
      caloriesBurned: [null, [Validators.required, Validators.min(1)]],
      steps: [null, [Validators.required, Validators.min(1)]],
      distance: [null, [Validators.required, Validators.min(0.1)]],
      date: [null, [Validators.required]]
    });

    this.getAllActivities();
  }

  // Submit Form
  submitForm() {
    if (this.activityForm.invalid) {
      alert("Please fill in all required fields.");
      return;
    }

    this.userService.postActivity(this.activityForm.value).subscribe(
      res => {
        alert("Activity posted successfully!");
        this.activityForm.reset();
        this.getAllActivities();
      },
      error => {
        alert("Error while posting activity. Please try again.");
      }
    );
  }

  // Fetch Activities
  getAllActivities() {
    this.userService.getActivities().subscribe(
      res => {
        this.activities = res;
      },
      error => {
        alert("Error fetching activities. Please try again.");
      }
    );
  }
}
