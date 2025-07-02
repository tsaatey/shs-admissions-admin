import { SessionStateStore } from './../../store/session.store';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import {
  CardComponent,
  CardBodyComponent,
  CardHeaderComponent,
  RowComponent,
  ColComponent,
  FormModule,
  ButtonDirective,
  NavModule,
  TabsModule,
} from '@coreui/angular';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationBloc } from '../../blocs/auth.bloc';

@Component({
  selector: 'app-account',
  imports: [
    CardComponent,
    CardBodyComponent,
    CardHeaderComponent,
    RowComponent,
    ColComponent,
    FormModule,
    ButtonDirective,
    NavModule,
    TabsModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent implements OnInit {
  private sessionStore = inject(SessionStateStore);
  private formBuilder = inject(FormBuilder);
  private toastr = inject(ToastrService);
  private authBloc = inject(AuthenticationBloc);

  public userForm: any;
  public changePasswordForm: any;

  public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: [
        { value: this.sessionStore.sessionUser().firstName, disabled: true },
      ],
      lastName: [
        { value: this.sessionStore.sessionUser().lastName, disabled: true },
      ],
      middleName: [
        { value: this.sessionStore.sessionUser().middleName, disabled: true },
      ],
      gender: [
        { value: this.sessionStore.sessionUser().gender, disabled: true },
      ],
      phoneNumber: [
        { value: this.sessionStore.sessionUser().phoneNumber, disabled: true },
      ],
      email: [{ value: this.sessionStore.sessionUser().email, disabled: true }],
    });

    this.changePasswordForm = this.formBuilder.group({
      previousPassword: ['', Validators.required],
      proposedPassword: ['', Validators.required],
      confirmProposedPassword: ['', Validators.required],
    });
  }

  async onChangePassword() {
    this.loading.next(true);

    try {
      const previousPassword = this.changePasswordForm.value.previousPassword;
      const proposedPassword = this.changePasswordForm.value.proposedPassword;
      const confirmProposedPassword =
        this.changePasswordForm.value.confirmProposedPassword;

      await this.authBloc.changePassword(
        previousPassword,
        proposedPassword,
        confirmProposedPassword
      );

      this.toastr.success('Password changed successfully');

      this.changePasswordForm.reset();

      this.loading.next(false);
    } catch (error: any) {
      this.loading.next(false);

      this.toastr.error(
        `An error occurred while changing the password. Please try again. ${
          error.error?.message || error.message || 'Unknown error'
        }`
      );
      console.error('Error changing password:', error);
    }
  }
}
