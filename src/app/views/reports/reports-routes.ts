import { NotEnrolledStudentsComponent } from './not-enrolled-students/not-enrolled-students.component';
import { EnrolledStudentsComponent } from './enrolled-students/enrolled-students.component';
import { AdmittedStudentsComponent } from './admitted-students/admitted-students.component';
import { AllPlacedStudentsComponent } from './all-placed-students/all-placed-students.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Reports',
    },
    children: [
      {
        path: '',
        redirectTo: 'students/all',
        pathMatch: 'full',
      },
      {
        path: 'students/all',
        component: AllPlacedStudentsComponent,
        data: { title: 'All Placed Students' },
      },
      {
        path: 'students/admitted',
        component: AdmittedStudentsComponent,
        data: { title: 'Admitted Students' },
      },
      {
        path: 'students/enrolled',
        component: EnrolledStudentsComponent,
        data: { title: 'Enrolled Students' },
      },
      {
        path: 'students/not-enrolled',
        component: NotEnrolledStudentsComponent,
        data: { title: 'Not Enrolled Students' },
      },
    ],
  },
];
