import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    title: true,
    name: 'Modules',
  },
  {
    name: 'Configurations',
    url: '/configurations',
    iconComponent: { name: 'cil-cog' },
    children: [
      {
        name: 'School config',
        url: '/configurations/school-config',
      },
      {
        name: 'Admission config',
        url: '/configurations/admission-config',
      },
      {
        name: 'Documents',
        url: '/configurations/documents',
      },
      {
        name: 'Upload students',
        url: '/configurations/student-upload',
      },
    ],
  },
  {
    name: 'Manual admissions',
    url: '/manual-admissions',
    iconComponent: { name: 'cil-pencil' },
  },
  {
    name: 'Reports',
    url: '/reports',
    iconComponent: { name: 'cil-notes' },
    children: [
      {
        name: 'All placed students',
        url: '/reports/students/all',
      },
      {
        name: 'Admitted students',
        url: '/reports/students/admitted',
      },
      {
        name: 'Enrolled students',
        url: '/reports/students/enrolled',
      },
      {
        name: 'Not enrolled students',
        url: '/reports/students/not-enrolled',
      },
    ],
  },
  {
    name: 'Downloads',
    url: '/downloads',
    iconComponent: { name: 'cil-cloud-download' },
  },
  {
    name: 'My Account',
    url: '/account',
    iconComponent: { name: 'cil-user' },
  },
];
