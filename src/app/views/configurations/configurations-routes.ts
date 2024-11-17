import { DocumentComponent } from './document/document.component';
import { UploadStudentComponent } from './upload-student/upload-student.component';
import { AdmissionConfigComponent } from './admission-config/admission-config.component';
import { SchoolConfigComponent } from './school-config/school-config.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Configurations',
    },
    children: [
      {
        path: '',
        redirectTo: 'school-config',
        pathMatch: 'full',
      },
      {
        path: 'school-config',
        component: SchoolConfigComponent,
        data: { title: 'School config' },
      },
      {
        path: 'admission-config',
        component: AdmissionConfigComponent,
        data: { title: 'Admission config' },
      },
      {
        path: 'student-upload',
        component: UploadStudentComponent,
        data: { title: 'Upload Students' },
      },
      {
        path: 'documents',
        component: DocumentComponent,
        data: { title: 'Manage Documents' },
      },
    ],
  },
];
