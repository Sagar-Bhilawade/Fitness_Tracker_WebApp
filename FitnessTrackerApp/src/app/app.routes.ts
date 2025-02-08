import { Routes } from '@angular/router';
import { ActivityComponent } from './components/activity/activity.component';
import { WorkoutComponent } from './components/workout/workout.component';
import { GoalComponent } from './components/goal/goal.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
  { path: "activity", component: ActivityComponent },
  { path: "workout", component: WorkoutComponent },
  { path: "goal", component: GoalComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "", redirectTo: "signin", pathMatch: "full" }, // Redirect to /signin
  { path: "signin", component: SigninComponent },
  { path: "signup", component: SignupComponent },
  { path: "profile", component: ProfileComponent },
  { path: "**", redirectTo: "signin" }, // Handle unknown routes
];
