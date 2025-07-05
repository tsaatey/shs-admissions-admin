import { AuthenticationBloc } from './../../../blocs/auth.bloc';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
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
  FormModule,
} from '@coreui/angular';
import { AuthStore } from '../../../store/authentication.store';
import { BehaviorSubject } from 'rxjs';
import {
  SignupDto,
  UserSignupDto,
} from '../../../interfaces/sign-up.interface';
import { ghanaPhoneValidator } from '../../../utils/func-utils';

@Component({
  selector: 'app-register-p2',
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
    FormModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register-p2.component.html',
  styleUrl: './register-p2.component.scss',
})
export class RegisterP2Component implements OnInit, AfterViewInit {
  public form: any;
  private store = inject(AuthStore);
  public loading = new BehaviorSubject<boolean>(false);

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authBloc: AuthenticationBloc,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', [Validators.required, ghanaPhoneValidator()]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  ngAfterViewInit(): void {
    this.form.patchValue({ ...this.store.cordData() });
  }

  async onCreateAccount() {
    // Start loading
    this.loading.next(true);

    try {
      const payload = {
        ...this.store.schoolData(),
        ...{
          firstName: this.form.value.firstName,
          lastName: this.form.value.lastName,
          gender: this.form.value.gender,
          email: this.form.value.email,
          phoneNumber: this.form.value.phoneNumber.replace(/\s+/g, ''),
          password: this.form.value.password,
          confirmPassword: this.form.value.confirmPassword,
        },
        middleName: '',
      } as SignupDto;

      // Make request to the server
      await this.authBloc.signup(payload);

      // Stop loading
      this.loading.next(false);

      // Save user data to store
      this.store.setCordData({ ...this.form.value } as UserSignupDto);

      // Navigate to account confirmation page
      this.router.navigate(['confirm-account']);
    } catch (error: any) {
      // Stop loading
      this.loading.next(false);

      // Display the error
      this.toastr.error(
        error?.message ||
          error?.error?.message ||
          'An error occurred while processing your request. Please try again.'
      );
    }
  }
}
