import { Routes } from '@angular/router';
import { ActivityComponent } from './components/activity/activity.component';
import { WorkoutComponent } from './components/workout/workout.component';
import { GoalComponent } from './components/goal/goal.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { BmiCalculatorComponent } from './components/bmi-calculator/bmi-calculator.component';
import { AuthGuard } from './services/auth.guard'; // ✅ Import AuthGuard

export const routes: Routes = [
  { path: "", component: HomeComponent }, // Set Landing Page as default
  { path: "signin", component: SigninComponent },
  { path: "signup", component: SignupComponent },
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] }, // 🔒 Protected Route
  { path: "activity", component: ActivityComponent, canActivate: [AuthGuard] }, // 🔒 Protected Route
  { path: "workout", component: WorkoutComponent, canActivate: [AuthGuard] }, // 🔒 Protected Route
  { path: "goal", component: GoalComponent, canActivate: [AuthGuard] }, // 🔒 Protected Route
  { path: 'bmi-calculator', component: BmiCalculatorComponent, canActivate: [AuthGuard] }, // 🔒 Protected Route
  { path: "**", redirectTo: "" }, // Redirect unknown routes to the landing page
];
