import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

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

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.goalForm = this.fb.group({
      description: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
    });

    this.getGoals();
  }

  // ✅ Form Submission with Loading State
  submitForm() {
    if (this.goalForm.invalid) {
      alert("Please fill in all required fields.");
      return;
    }

    this.isLoading = true; // ✅ Start loading
    this.userService.postGoal(this.goalForm.value).subscribe(
      res => {
        alert("🎯 Goal Posted Successfully!");
        this.goalForm.reset();
        this.getGoals();
      },
      error => {
        console.error("🚨 Error posting goal:", error);
        alert("Error while posting goal. Please try again.");
        this.isLoading = false;
      }
    );
  }

  // ✅ Fetch Goals
  getGoals() {
    this.isLoading = true; // ✅ Start loading
    this.userService.getGoals().subscribe(
      res => {
        this.goals = res;
        this.isLoading = false; // ✅ Stop loading
      },
      error => {
        console.error("🚨 Error fetching goals:", error);
        alert("Error fetching goals. Please try again.");
        this.isLoading = false;
      }
    );
  }

  // ✅ Update Goal Status
  updateStatus(id: number) {
    this.userService.updateGoalStatus(id).subscribe(
      res => {
        alert("✅ Goal updated successfully!");
        this.getGoals();
      },
      error => {
        console.error("🚨 Error updating goal:", error);
        alert("Error while updating goal. Please try again.");
      }
    );
  }
}
