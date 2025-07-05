import { ToastrService } from 'ngx-toastr';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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
} from '@coreui/angular';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationBloc } from '../../../blocs/auth.bloc';
import { CommonModule } from '@angular/common';
import { Base64 } from 'js-base64';
import { AuthStore } from '../../../store/authentication.store';

@Component({
  selector: 'app-forgot-password',
  imports: [
    CommonModule,
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardComponent,
    CardBodyComponent,
    InputGroupComponent,
    FormControlDirective,
    ButtonDirective,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent implements OnInit {
  public form: any;
  public loading = new BehaviorSubject<boolean>(false);
  private store = inject(AuthStore);

  constructor(
    private formBuilder: FormBuilder,
    private authBloc: AuthenticationBloc,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }

  async onForgotPassword() {
    // Start loading
    this.loading.next(true);

    // Get the values from the form
    const email = this.form.value.email ?? '';

    try {
      await this.authBloc.forgotPassword(email);

      // Stop loading
      this.loading.next(false);

      // Set email as usr in store
      this.store.setUsr(email);

      // Redirect to reset password screen
      this.router.navigate(['reset-password'], {
        queryParams: { usr: Base64.encode(email, true) },
      });
    } catch (error: any) {
      // Stop loading
      this.loading.next(false);

      this.toastr.error(
        error?.message ||
          error?.error?.message ||
          'An error occurred while processing your request. Please try again.'
      );
    }
  }
}
