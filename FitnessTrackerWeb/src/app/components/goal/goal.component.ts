import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from '../../services/user.service';
import { SharedModule } from '../../shared/shared.module';
import { error } from 'console';

@Component({
  selector: 'app-goal',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './goal.component.html',
  styleUrl: './goal.component.scss'
})
export class GoalComponent {
  gridStyle: { [key: string]: string } = {
    width: '100%',
    textAlign: 'center'
  };
  goalForm!: FormGroup;
  goals:any;
  constructor(private fb: FormBuilder, private message: NzMessageService, private userService: UserService) { }
  ngOnInit(): void {
    this.goalForm = this.fb.group({
      description: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
    });

    this.getGoals();
  }



  // Form Submit
  submitForm() {
    this.userService.postGoal(this.goalForm.value).subscribe(
      res => {
           this.message.success("Goal Posted Succesfully",{nzDuration:5000});
           this.goalForm.reset();
           this.getGoals();
      }, error => {
        this.message.error("Error while posting goal", { nzDuration: 5000 })
      }

    )
  }


  // Get Goals
  getGoals(){
    this.userService.getGoals().subscribe(
      res=>{
        this.goals = res;
      }
    )
  }
}
