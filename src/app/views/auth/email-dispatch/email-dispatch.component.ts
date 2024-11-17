import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  CardComponent,
  CardBodyComponent,
  FormModule,
} from '@coreui/angular';
import { CodeInputModule } from 'angular-code-input';
import { BehaviorSubject } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-email-dispatch',
  standalone: true,
  imports: [
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardComponent,
    CardBodyComponent,
    RouterModule,
    FormModule,
    CodeInputModule,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './email-dispatch.component.html',
  styleUrl: './email-dispatch.component.scss',
})
export class EmailDispatchComponent implements OnInit {
  public loading = new BehaviorSubject<boolean>(false);
  public requestingCode = new BehaviorSubject<boolean>(false);

  timer: number = 60; // 60 seconds countdown
  interval: any;
  canRequestNewCode: boolean = false;

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval); // Clear interval when component is destroyed
    }
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.canRequestNewCode = true;
        clearInterval(this.interval);
      }
    }, 1000); // Update every second
  }

  onCodeCompleted(code: string) {}

  requestNewCode() {}
}
