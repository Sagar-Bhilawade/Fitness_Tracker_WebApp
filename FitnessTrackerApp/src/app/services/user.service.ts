import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  postActivity(activityDto: any): Observable<any> {
    const userId = this.getUserId();
    if (!userId) return new Observable(); // Prevent request if userId is missing

    return this.http.post(BASIC_URL + 'api/activity', { ...activityDto, userId });
  }

  getActivities(): Observable<any> {
    const userId = this.getUserId();
    if (!userId) return new Observable();

    return this.http.get(BASIC_URL + 'api/activities', {
      params: new HttpParams().set('userId', userId),
    });
  }

  postWorkout(workoutDto: any): Observable<any> {
    const userId = this.getUserId();
    if (!userId) return new Observable();

    return this.http.post(BASIC_URL + 'api/workout', { ...workoutDto, userId });
  }

  getWorkouts(): Observable<any> {
    const userId = this.getUserId();
    if (!userId) return new Observable();

    return this.http.get(BASIC_URL + 'api/workouts', {
      params: new HttpParams().set('userId', userId),
    });
  }

  postGoal(goalDto: any): Observable<any> {
    const userId = this.getUserId();
    if (!userId) return new Observable();

    return this.http.post(BASIC_URL + 'api/goal', { ...goalDto, userId });
  }

  getGoals(): Observable<any> {
    const userId = this.getUserId();
    if (!userId) return new Observable();

    return this.http.get(BASIC_URL + 'api/goals', {
      params: new HttpParams().set('userId', userId),
    });
  }

  updateGoalStatus(id: number): Observable<any> {
    const userId = this.getUserId();
    if (!userId) return new Observable();

    return this.http.get(BASIC_URL + `api/goal/status/${id}`, {
      params: new HttpParams().set('userId', userId),
    });
  }

  getStats(): Observable<any> {
    const userId = this.getUserId();
    if (!userId) return new Observable();

    return this.http.get(BASIC_URL + 'api/stats', {
      params: new HttpParams().set('userId', userId),
    });
  }

  getGraphStats(): Observable<any> {
    const userId = this.getUserId();
    if (!userId) return new Observable();

    return this.http.get(BASIC_URL + 'api/graphs', {
      params: new HttpParams().set('userId', userId),
    });
  }

  signin(signinDto: any): Observable<any> {
    console.log('Sign In DTO:', signinDto);
    return this.http.post(BASIC_URL + 'api/signin', signinDto);
  }

  signup(signupDto: any): Observable<any> {
    console.log('Sign Up DTO:', signupDto);
    return this.http.post(BASIC_URL + 'api/signup', signupDto);
  }
}
