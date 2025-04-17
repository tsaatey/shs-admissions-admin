import { SessionUtilities } from './../../../utils/session.utilities';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationBloc } from './../../../blocs/auth.bloc';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
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
import { AuthStore } from '../../../store/authentication.store';

@Component({
  selector: 'app-email-dispatch',
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
export class EmailDispatchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  public loading = new BehaviorSubject<boolean>(false);
  public requestingCode = new BehaviorSubject<boolean>(false);
  private store = inject(AuthStore);
  public email: string = '';

  timer: number = 60; // 60 seconds countdown
  interval: any;
  canRequestNewCode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authBloc: AuthenticationBloc,
    private toastr: ToastrService,
    private sessionUtils: SessionUtilities,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.startTimer();
  }

  ngAfterViewInit(): void {
    this.email = this.route.snapshot.paramMap.get('username') || '';
    if (!this.email) {
      this.email = this.store.cordData().email;
    }

    this.cdr.detectChanges();
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

  async onCodeCompleted(code: string) {
    await this.confirmAccount(code);
  }

  async confirmAccount(code: string) {
    this.loading.next(true);
    try {
      await this.authBloc.confirmSignup(this.email, code);

      // Stop loading
      this.loading.next(false);

      // Display success message
      this.toastr.success('Account successfully confirmed!');

      // Clear the stores and return to login page
      setTimeout(() => {
        this.sessionUtils.signOut();
      }, 5000);
    } catch (error: any) {
      // Stop loading
      this.loading.next(false);

      this.toastr.error(`Failed to confirm account: ${error?.error?.message}`);
    }
  }

  async requestNewCode(email: string) {
    this.requestingCode.next(true);
    try {
      await this.authBloc.requestNewCode(email);

      this.toastr.success('Code sent! Please check your email');

      this.requestingCode.next(false);

      this.timer = 30; // Reset timer
      this.canRequestNewCode = false;
      this.startTimer(); // Restart the countdown
    } catch (error: any) {
      this.requestingCode.next(false);

      this.toastr.error(`Failed to send code: ${error?.error?.message}`);
    }
  }
}
