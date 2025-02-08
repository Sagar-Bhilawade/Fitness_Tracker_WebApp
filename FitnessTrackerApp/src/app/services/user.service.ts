import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const BASIC_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private getUserId(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).userId : null;
  }

  private handleMissingUserId(): Observable<never> {
    return throwError(() => new Error('User ID not found. Please log in again.'));
  }


  getActivities(): Observable<any> {
    const userId = this.getUserId();
    if (!userId) return this.handleMissingUserId();

    return this.http.get(BASIC_URL + 'api/activities', {
      params: new HttpParams().set('userId', userId),
    }).pipe(
      catchError(error => throwError(() => new Error('Failed to fetch activities: ' + error.message)))
    );
  }

// ✅ Updated postWorkout() method
postWorkout(workoutDto: any): Observable<any> {
  const userId = this.getUserId();
  if (!userId) return this.handleMissingUserId();

  return this.http.post(`${BASIC_URL}api/workout?userId=${userId}`, workoutDto).pipe(
    catchError(error => throwError(() => new Error('Failed to post workout: ' + error.message)))
  );
}

// ✅ Updated postActivity() method
postActivity(activityDto: any): Observable<any> {
  const userId = this.getUserId();
  if (!userId) return this.handleMissingUserId();

  return this.http.post(`${BASIC_URL}api/activity?userId=${userId}`, activityDto).pipe(
    catchError(error => throwError(() => new Error('Failed to post activity: ' + error.message)))
  );
}


  getWorkouts(): Observable<any> {
    const userId = this.getUserId();
    if (!userId) return this.handleMissingUserId();

    return this.http.get(BASIC_URL + 'api/workouts', {
      params: new HttpParams().set('userId', userId),
    }).pipe(
      catchError(error => throwError(() => new Error('Failed to fetch workouts: ' + error.message)))
    );
  }

  postGoal(goalDto: any): Observable<any> {
    const userId = this.getUserId();
    if (!userId) return this.handleMissingUserId();

    return this.http.post(`${BASIC_URL}api/goal?userId=${userId}`, goalDto).pipe(
      catchError(error => throwError(() => new Error('Failed to post goal: ' + error.message)))
    );
  }


  getGoals(): Observable<any> {
    const userId = this.getUserId();
    if (!userId) return this.handleMissingUserId();

    return this.http.get(BASIC_URL + 'api/goals', {
      params: new HttpParams().set('userId', userId),
    }).pipe(
      catchError(error => throwError(() => new Error('Failed to fetch goals: ' + error.message)))
    );
  }

  updateGoalStatus(id: number): Observable<any> {
    const userId = this.getUserId();
    if (!userId) return this.handleMissingUserId();

    return this.http.get(BASIC_URL + `api/goal/status/${id}`, {
      params: new HttpParams().set('userId', userId),
    }).pipe(
      catchError(error => throwError(() => new Error('Failed to update goal status: ' + error.message)))
    );
  }

  getStats(): Observable<any> {
    const userId = this.getUserId();
    if (!userId) return this.handleMissingUserId();

    return this.http.get(BASIC_URL + 'api/stats', {
      params: new HttpParams().set('userId', userId),
    }).pipe(
      catchError(error => throwError(() => new Error('Failed to fetch stats: ' + error.message)))
    );
  }

  getGraphStats(): Observable<any> {
    const userId = this.getUserId();
    if (!userId) return this.handleMissingUserId();

    return this.http.get(BASIC_URL + 'api/graphs', {
      params: new HttpParams().set('userId', userId),
    }).pipe(
      catchError(error => throwError(() => new Error('Failed to fetch graph stats: ' + error.message)))
    );
  }

  signin(signinDto: any): Observable<any> {
    return this.http.post(BASIC_URL + 'api/signin', signinDto).pipe(
      catchError(error => throwError(() => new Error('Sign-in failed: ' + error.message)))
    );
  }

  signup(signupDto: any): Observable<any> {
    return this.http.post(BASIC_URL + 'api/signup', signupDto).pipe(
      catchError(error => throwError(() => new Error('Sign-up failed: ' + error.message)))
    );
  }
}
