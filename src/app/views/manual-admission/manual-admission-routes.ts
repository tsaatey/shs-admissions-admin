import { ManualAdmissionComponent } from './manual-admission.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'manual-admissions',
        pathMatch: 'full',
      },
      {
        path: '',
        component: ManualAdmissionComponent,
        data: {
          title: 'Manual Admissions',
        },
      },
    ],
  },
];
