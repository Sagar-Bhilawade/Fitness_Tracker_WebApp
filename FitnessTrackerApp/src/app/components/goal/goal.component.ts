import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'; // ✅ Import ToastrService

@Component({
  selector: 'app-goal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // ✅ Import required modules
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.scss'] // ✅ Fix property name
})
export class GoalComponent implements OnInit {
  gridStyle: { [key: string]: string } = {
    width: '100%',
    textAlign: 'center'
  };

  goalForm!: FormGroup;
  goals: any[] = []; // ✅ Initialize with an empty array
  isLoading: boolean = false; // ✅ Track loading state

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService // ✅ Inject ToastrService
  ) {}

  ngOnInit(): void {
    this.goalForm = this.fb.group({
      description: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
    });

    this.getGoals();
  }

  // ✅ Form Submission with Toaster Notifications
  submitForm() {
    if (this.goalForm.invalid) {
      this.toastr.warning('Please fill in all required fields.', 'Warning'); // ⚠️ Validation Warning
      return;
    }

    this.isLoading = true; // ✅ Start loading
    this.userService.postGoal(this.goalForm.value).subscribe(
      res => {
        this.toastr.success('🎯 Goal Posted Successfully!', 'Success'); // ✅ Success Message
        this.goalForm.reset();
        this.getGoals();
      },
      error => {
        console.error('🚨 Error posting goal:', error);
        this.toastr.error('Error while posting goal. Please try again.', 'Error'); // ❌ Error Message
        this.isLoading = false;
      }
    );
  }

  // ✅ Fetch Goals with Loading Indicator
  getGoals() {
    this.isLoading = true; // ✅ Start loading
    this.userService.getGoals().subscribe(
      res => {
        this.goals = res;
        this.isLoading = false; // ✅ Stop loading
      },
      error => {
        console.error('🚨 Error fetching goals:', error);
        this.toastr.error('Error fetching goals. Please try again.', 'Error'); // ❌ Error Message
        this.isLoading = false;
      }
    );
  }

  // ✅ Update Goal Status with Toaster Notifications
  updateStatus(id: number) {
    this.userService.updateGoalStatus(id).subscribe(
      res => {
        this.toastr.success('✅ Goal updated successfully!', 'Success'); // ✅ Success Message
        this.getGoals();
      },
      error => {
        console.error('🚨 Error updating goal:', error);
        this.toastr.error('Error while updating goal. Please try again.', 'Error'); // ❌ Error Message
      }
    );
  }
}
