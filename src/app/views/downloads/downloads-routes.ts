import { Routes } from '@angular/router';
import { DownloadsComponent } from './downloads.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'downloads',
        pathMatch: 'full',
      },
      {
        path: '',
        component: DownloadsComponent,
        data: {
          title: 'Downloads',
        },
      },
    ],
  },
];
