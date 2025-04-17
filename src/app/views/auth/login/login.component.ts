import { SessionUtilities } from './../../../utils/session.utilities';
import { SchoolRepository } from './../../../repositories/school.repo';
import { SessionStateStore } from './../../../store/session.store';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  CardGroupComponent,
  TextColorDirective,
  CardComponent,
  CardBodyComponent,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  ButtonDirective,
} from '@coreui/angular';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationBloc } from '../../../blocs/auth.bloc';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { School } from '../../../models/school.model';
import { AuthStore } from '../../../store/authentication.store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    FormControlDirective,
    ButtonDirective,
    RouterModule,
    ReactiveFormsModule,
  ],
})
export class LoginComponent implements OnInit {
  readonly sessionStore = inject(SessionStateStore);
  readonly authStore = inject(AuthStore);
  public loading = new BehaviorSubject<boolean>(false);

  public loginForm: any;

  constructor(
    private authBloc: AuthenticationBloc,
    private toastr: ToastrService,
    private schoolRepo: SchoolRepository,
    private router: Router,
    private formBuilder: FormBuilder,
    private util: SessionUtilities
  ) {}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
  }

  async onLogin() {
    // start loading
    this.loading.next(true);

    // Get the values from the login form
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    try {
      const response = await this.authBloc.login(email ?? '', password ?? '');
      if (response.success && response.user) {
        // Login success, get school information.
        // Get school Id
        const schoolId = response.user?.school.schoolId;

        // Get school
        const result = await this.schoolRepo.getSchoolInfo(schoolId ?? '');
        if (result.success) {
          // Stop loading
          this.loading.next(false);

          // Set school user
          this.sessionStore.setSessionSchool(result.data || ({} as School));

          // Redirect to dashboard
          setTimeout(() => {
            this.router.navigate(['dashboard']);
          }, 500);
        } else {
          // Stop loading
          this.loading.next(false);

          // Display message for failing to get school information
          this.toastr.error(result.message, 'Cannot Get School');

          // Clear the stores
          this.util.signOut();
        }
      }
    } catch (error: any) {
      this.loading.next(false);

      console.log(error);

      if (error?.message === 'User is not confirmed.') {
        setTimeout(() => {
          this.toastr.error(
            `${error?.message}. Redirecting you to confirm account...`
          );
          // Redirect to confirm account
          this.router.navigate(['confirm-account'], {
            queryParams: { username: email },
          });
        }, 500);
      } else {
        // Login failed
        this.toastr.error(error?.message || error?.error);
      }
    }
  }
}
