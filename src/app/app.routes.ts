import { ResetPasswordComponent } from './views/auth/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './views/auth/forgot-password/forgot-password.component';
import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  // Default route should redirect to the login page
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // '/login' should redirect to the login page
  { path: 'login', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () =>
      import('./views/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./views/auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'sign-up-continued',
    loadComponent: () =>
      import('./views/auth/register-p2/register-p2.component').then(
        (m) => m.RegisterP2Component
      ),
  },
  {
    path: 'confirm-account',
    loadComponent: () =>
      import('./views/auth/email-dispatch/email-dispatch.component').then(
        (m) => m.EmailDispatchComponent
      ),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./views/auth/forgot-password/forgot-password.component').then(
        (m) => m.ForgotPasswordComponent
      ),
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./views/auth/reset-password/reset-password.component').then(
        (m) => m.ResetPasswordComponent
      ),
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [authGuard],
    data: {
      title: 'Home',
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/routes').then((m) => m.routes),
      },
      {
        path: 'configurations',
        loadChildren: () =>
          import('./views/configurations/configurations-routes').then(
            (m) => m.routes
          ),
      },
      {
        path: 'manual-admissions',
        loadChildren: () =>
          import('./views/manual-admission/manual-admission-routes').then(
            (m) => m.routes
          ),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./views/reports/reports-routes').then((m) => m.routes),
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
