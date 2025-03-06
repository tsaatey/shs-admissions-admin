import { SchoolRepository } from './../../../repositories/school.repo';
import { SessionStateStore } from './../../../store/session.store';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  CardGroupComponent,
  TextColorDirective,
  CardComponent,
  CardBodyComponent,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  ButtonDirective,
  FormModule,
} from '@coreui/angular';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationBloc } from '../../../blocs/auth.bloc';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { School } from '../../../models/school.model';
import { AuthStore } from '../../../store/authentication.store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    FormControlDirective,
    ButtonDirective,
    NgStyle,
    RouterModule,
    ReactiveFormsModule,
    FormModule,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    private formBuilder: FormBuilder
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

        // Redirect to dashboard (default) for now
        this.router.navigate(['dashboard']);
      } else {
        // Stop loading
        this.loading.next(false);

        // Display message for failing to get school information
        this.toastr.error(result.message, 'Cannot Get School');

        // Clear the stores
        this.authStore.reset();
        this.sessionStore.reset();
      }
    } else if (response.success && response.other) {
      // Redirect to claim account page
      const data = response.other;
      const session = data.session;
      const username = email;

      // Redirect to claim account
      this.router.navigate(['confirm-account'], {
        queryParams: { session: session, username: username },
      });
    } else {
      // Stop loading
      this.loading.next(false);

      // Login failed
      this.toastr.error(response.message, 'Login Error');
      // console.log(response.message)
    }
  }
}
