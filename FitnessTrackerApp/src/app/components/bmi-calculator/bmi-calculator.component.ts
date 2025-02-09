import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-bmi-calculator',
  imports: [SharedModule],
  templateUrl: './bmi-calculator.component.html',
  styleUrl: './bmi-calculator.component.scss'
})
export class BmiCalculatorComponent {
  gender: string = 'male';
  height: number = 170;
  weight: number = 70;
  bmi: number | null = null;
  bmiMessage: string = '';
  indicatorPosition: number = 50;

  calculateBMI() {
    if (!this.height || !this.weight) {
      alert('Please enter valid height and weight.');
      return;
    }

    let heightInMeters = this.height / 100;
    this.bmi = this.weight / (heightInMeters * heightInMeters);

    if (this.bmi < 18.5) {
      this.bmiMessage = "You are Underweight. Consider a balanced diet.";
      this.indicatorPosition = 10;
    } else if (this.bmi >= 18.5 && this.bmi < 24.9) {
      this.bmiMessage = "You have a Normal weight. Keep up the good work!";
      this.indicatorPosition = 40;
    } else if (this.bmi >= 25 && this.bmi < 29.9) {
      this.bmiMessage = "You are Overweight. Consider regular exercise.";
      this.indicatorPosition = 70;
    } else {
      this.bmiMessage = "You are Obese. Consult a health expert.";
      this.indicatorPosition = 90;
    }
  }
}
