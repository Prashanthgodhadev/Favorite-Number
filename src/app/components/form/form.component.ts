import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule,
    MatSelectModule, MatInputModule, MatButtonModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnDestroy {
  numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  generatedNumber: any;
  randomNumberForm: FormGroup;
  private destroy$ = new Subject<void>();
  private intervalSubscription: any;
  loading: boolean = false;

  constructor(private fb: FormBuilder) {
    this.randomNumberForm = this.fb.group({
      favoriteNumber: [0, [Validators.required, Validators.min(0), Validators.max(9)]],
      numberLength: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
    });
  }

  generatingNumbers() {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }

    if (this.randomNumberForm.valid) {
      const { favoriteNumber, numberLength } = this.randomNumberForm.value;
      this.loading = true;
      this.intervalSubscription = interval(5000)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.loading = false;
          this.generatedNumber = this.generateNumber(favoriteNumber, numberLength);
        });
    } else {
      alert('Please fill in the form correctly!');
    }
  }

  private generateNumber(favoriteNumber: number, numberLength: number): string {
    let randomString = '';
    for (let i = 0; i < numberLength; i++) {
      randomString += Math.floor(Math.random() * 10);
    }

    randomString = randomString.slice(0, -1) + favoriteNumber;
    return randomString;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }
}
