import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { UserService } from '../../services/user.service';
import Chart, { CategoryScale } from 'chart.js/auto';
import { DatePipe } from '@angular/common';

Chart.register(CategoryScale);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DatePipe],
})
export class DashboardComponent {
  statsData: any = {};
  workouts: any = [];
  activities: any = [];
  private workoutChart: Chart | null = null;
  private activityChart: Chart | null = null;

  @ViewChild('workoutLineChart') private workoutLineChartRef!: ElementRef;
  @ViewChild('activityLineChart') private activityLineChartRef!: ElementRef;

  constructor(
    private userService: UserService,
    private datePipe: DatePipe,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // Lifecycle Hooks
  ngOnInit(): void {
    this.getStats();
    this.getGraphStats();
  }

  // Fetch stats
  getStats() {
    this.userService.getStats().subscribe((res) => {
      console.log(res);
      this.statsData = res;
    });
  }

  // Fetch graph stats
  getGraphStats() {
    this.userService.getGraphStats().subscribe((res) => {
      this.workouts = res.workouts;
      this.activities = res.activities;

      if (isPlatformBrowser(this.platformId) && this.workouts && this.activities) {
        this.createCharts();
      }
    });
  }

  // Create charts for workouts and activities
  createCharts() {
    // Destroy existing charts if any
    if (this.workoutChart) this.workoutChart.destroy();
    if (this.activityChart) this.activityChart.destroy();

    const workoutCtx = this.workoutLineChartRef.nativeElement.getContext('2d');
    const activityCtx = this.activityLineChartRef.nativeElement.getContext('2d');

    if (!workoutCtx || !activityCtx) {
      console.error('Canvas context could not be retrieved.');
      return;
    }

    // Create Workout Line Chart
    this.workoutChart = new Chart(workoutCtx, {
      type: 'line',
      data: {
        labels: this.workouts.map((data: { date: string }) =>
          this.datePipe.transform(data.date, 'MM/dd')
        ),
        datasets: [
          {
            label: 'Calories Burned',
            data: this.workouts.map((data: { caloriesBurned: number }) => data.caloriesBurned),
            fill: false,
            borderWidth: 2,
            backgroundColor: 'rgba(20,200,120,0.6)',
            borderColor: 'rgba(0,100,0,1)',
          },
          {
            label: 'Duration',
            data: this.workouts.map((data: { duration: number }) => data.duration),
            fill: false,
            borderWidth: 2,
            backgroundColor: 'rgba(120,150,200,0.6)',
            borderColor: 'rgba(0,0,150,1)',
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Create Activity Line Chart
    this.activityChart = new Chart(activityCtx, {
      type: 'line',
      data: {
        labels: this.activities.map((data: { date: string }) =>
          this.datePipe.transform(data.date, 'MM/dd')
        ),
        datasets: [
          {
            label: 'Calories Burned',
            data: this.activities.map((data: { caloriesBurned: number }) => data.caloriesBurned),
            fill: false,
            borderWidth: 2,
            backgroundColor: 'rgba(155,150,150,0.6)',
            borderColor: 'rgba(255,0,0,1)',
          },
          {
            label: 'Steps Taken',
            data: this.activities.map((data: { steps: number }) => data.steps),
            fill: false,
            borderWidth: 2,
            backgroundColor: 'rgba(255,99,132,0.6)',
            borderColor: 'rgba(255,0,0,1)',
          },
          {
            label: 'Distance Covered (km)',
            data: this.activities.map((data: { distance: number }) => data.distance),
            fill: false,
            borderWidth: 2,
            backgroundColor: 'rgba(54,162,235,0.6)',
            borderColor: 'rgba(0,0,255,1)',
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
