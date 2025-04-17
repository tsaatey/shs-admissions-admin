import { ToastrService } from 'ngx-toastr';
import { AuthenticationBloc } from './../../../blocs/auth.bloc';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  CardComponent,
  CardBodyComponent,
  InputGroupComponent,
  FormControlDirective,
  ButtonDirective,
  FormDirective,
  TextColorDirective,
} from '@coreui/angular';
import { BehaviorSubject } from 'rxjs';
import { AuthStore } from '../../../store/authentication.store';

@Component({
  selector: 'app-reset-password',
  imports: [
    CommonModule,
    ContainerComponent,
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    FormControlDirective,
    ButtonDirective,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit {
  public form: any;
  public loading = new BehaviorSubject<boolean>(false);
  public email: string = '';
  private store = inject(AuthStore);

  constructor(
    private formBuilder: FormBuilder,
    private authBloc: AuthenticationBloc,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.email = this.store.usr();

    this.form = this.formBuilder.group({
      proposedPassword: ['', Validators.required],
      confirmProposedPassword: ['', Validators.required],
      confirmationCode: ['', Validators.required],
    });
  }

  async onPasswordReset() {
    // Start loading
    this.loading.next(true);

    try {
      // Get form data
      const proposedPassword = this.form.value.proposedPassword || '';
      const confirmProposedPassword =
        this.form.value.confirmProposedPassword || '';
      const confirmationCode = this.form.value.confirmationCode || '';

      await this.authBloc.resetPassword(
        proposedPassword,
        confirmProposedPassword,
        confirmationCode,
        this.email
      );

      // Stop loading
      this.loading.next(false);

      // Display success
      this.toastr.success('Password reset successful.');

      setTimeout(() => {
        this.router.navigate(['login']);
      }, 500);
    } catch (error: any) {
      // Stop loading
      this.loading.next(false);

      // Display error
      this.toastr.error(error?.message || error?.error);
    }
  }
}
