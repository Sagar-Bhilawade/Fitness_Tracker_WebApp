import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-workout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit {
  workoutForm!: FormGroup;
  workouts: any[] = [];
  isLoading: boolean = false;
  userId: string | null = '';

  listOfType: string[] = [
    "Strength Training", "Cardio", "Yoga", "Pilates", "CrossFit",
    "HIIT", "Circuit Training", "Aerobics", "Dance Fitness", "Barre",
    "Stretching", "Martial Arts", "Boxing", "Running", "Walking",
    "Cycling", "Swimming", "Rowing", "Climbing", "Hiking",
    "Resistance Band Training", "Bodyweight Training", "Powerlifting",
    "Weightlifting", "Zumba", "Spinning", "Aqua Aerobics", "Calisthenics",
    "Tai Chi", "Kickboxing"
  ];

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.userId = this.getUserId();

    this.workoutForm = this.fb.group({
      type: [null, [Validators.required]],
      duration: [null, [Validators.required, Validators.min(1)]],
      date: [null, [Validators.required]],
      caloriesBurned: [null, [Validators.required]]
    });

    if (this.userId) {
      this.getWorkouts();
    }
  }

  private getUserId(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).userId : null;
  }

  // Submit Workout Form
  submitForm() {
    if (this.workoutForm.invalid || !this.userId) {
      alert("Please fill in all required fields.");
      return;
    }

    this.isLoading = true;
    const workoutData = { ...this.workoutForm.value, userId: this.userId };

    this.userService.postWorkout(workoutData).subscribe({
      next: () => {
        alert("Workout posted successfully!");
        this.workoutForm.reset();
        this.getWorkouts();
      },
      error: (error) => {
        alert("Error while posting workout: " + error.message);
      },
      complete: () => (this.isLoading = false)
    });
  }

  // Fetch Past Workouts
  getWorkouts() {
    this.isLoading = true;
    this.userService.getWorkouts().subscribe({
      next: (res) => {
        this.workouts = res;
      },
      error: (error) => {
        alert("Error fetching workouts: " + error.message);
      },
      complete: () => (this.isLoading = false)
    });
  }
}
