import { Routes } from '@angular/router';
import { ActivityComponent } from './components/activity/activity.component';
import { WorkoutComponent } from './components/workout/workout.component';
import { GoalComponent } from './components/goal/goal.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { BmiCalculatorComponent } from './components/bmi-calculator/bmi-calculator.component';

export const routes: Routes = [
  { path: "", component: HomeComponent}, // Set Landing Page as default
  { path: "signin", component: SigninComponent },
  { path: "signup", component: SignupComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "activity", component: ActivityComponent },
  { path: "workout", component: WorkoutComponent },
  { path: "goal", component: GoalComponent },
  { path: "profile", component: ProfileComponent },
  { path: 'bmi-calculator', component: BmiCalculatorComponent },
  { path: "**", redirectTo: "" }, // Redirect unknown routes to the landing page
];
