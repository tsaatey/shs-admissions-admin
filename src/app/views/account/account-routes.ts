import { Routes } from '@angular/router';
import { AccountComponent } from './account.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'account',
        pathMatch: 'full',
      },
      {
        path: '',
        component: AccountComponent,
        data: {
          title: 'My Account',
        },
      },
    ],
  },
];
