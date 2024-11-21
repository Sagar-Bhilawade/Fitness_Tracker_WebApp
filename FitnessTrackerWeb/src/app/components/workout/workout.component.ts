import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { error } from 'console';

@Component({
  selector: 'app-workout',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './workout.component.html',
  styleUrl: './workout.component.scss'
})
export class WorkoutComponent {
  gridStyle = {
    width: '100%',
    textAlign: 'center'
  };
  workoutFrom!: FormGroup;
  workouts:any;
  listOfType: any[] = [
    "Strength Training", "Cardio", "Yoga", "Pilates", "CrossFit", "High-Intensity Interval Training (HIIT)", "Circuit Training", "Aerobics", "Dance Fitness", "Barre", "Stretching", "Martial Arts", "Boxing", "Running", "Walking", "Cycling", "Swimming", "Rowing", "Climbing", "Hiking", "Resistance Band Training", "Bodyweight Training", "Powerlifting", "Weightlifting", "Zumba", "Spinning", "Aqua Aerobics", "Calisthenics", "Tai Chi", "Kickboxing"
  ]

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private message: NzMessageService
  ) { };

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.workoutFrom = this.fb.group({
      type: [null,[Validators.required]],
      duration: [null,[Validators.required]],
      date: [null,[Validators.required]],
      caloriesBurned: [null,[Validators.required]],
    })

    //load past workouts
    this.getWorkouts();

  };


  //       Submitting Form
  submitForm(){
    this.userService.postWorkout(this.workoutFrom.value).subscribe(
    res=>{
      this.message.success("Workout posted successfully", {nzDuration: 5000});
      this.workoutFrom.reset();
      this.getWorkouts();
    }, error=>{
      this.message.error("Error while posting workout",{nzDuration: 5000});
    }
    )
  };

  // get Workouts
  getWorkouts(){
this.userService.getWorkouts().subscribe(
res=>{
  this.workouts = res;
})
};
// done get workouts



}
