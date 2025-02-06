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
    this.workoutForm = this.fb.group({
      type: [null, [Validators.required]],
      duration: [null, [Validators.required, Validators.min(1)]],
      date: [null, [Validators.required]],
      caloriesBurned: [null, [Validators.required]]
    });

    this.getWorkouts();
  }

  // Submit Workout Form
  submitForm() {
    if (this.workoutForm.invalid) {
      alert("Please fill in all required fields.");
      return;
    }

    this.userService.postWorkout(this.workoutForm.value).subscribe(
      res => {
        alert("Workout posted successfully!");
        this.workoutForm.reset();
        this.getWorkouts();
      },
      error => {
        alert("Error while posting workout. Please try again.");
      }
    );
  }

  // Fetch Past Workouts
  getWorkouts() {
    this.userService.getWorkouts().subscribe(
      res => {
        this.workouts = res;
      },
      error => {
        alert("Error fetching workouts. Please try again.");
      }
    );
  }
}
