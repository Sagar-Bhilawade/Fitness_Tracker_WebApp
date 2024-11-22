import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SharedModule } from '../../shared/shared.module';
import Chart, { CategoryScale } from 'chart.js/auto'

Chart.register(CategoryScale);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  statsData: any;

  workouts: any;
  activities: any;
  @ViewChild('workoutLineChart') private workoutLineChartRef: ElementRef;
  @ViewChild('activityLineChart') private activityLineChartRef: ElementRef;

  constructor(private userService: UserService) {

  }


  // NgOnInit Starts
  ngOnInit(): void {
    this.getStats();
    this.getGraphStats();

  }
  // NgOnInit Ends

  // Get stats Started
  getStats() {
    this.userService.getStats().subscribe(
      res => {
        console.log(res);
        this.statsData = res;
      }
    )
  }
  // Get Stats Completed


  // Get Graph Data Starts
  getGraphStats() {
    this.userService.getGraphStats().subscribe(
      res => {
        this.workouts = res.workouts;
        this.activities = res.activities;
        console.log(this.workouts, this.activities)
        if (this.workoutLineChartRef || this.activityLineChartRef) {
          this.createLineChart();
        }
      }
    )
  }
  // Get Graph Data Ends

  // Create a chart starts
  createLineChart() {
    const workoutCtx = this.workoutLineChartRef.nativeElement.getContext('2d');
    const activityCtx = this.activityLineChartRef.nativeElement.getContext('2d');

    new Chart(workoutCtx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }

  //

}
