import { AdmisionManagementRepository } from './../../repositories/admission-management.repo';
import { Component, inject, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import {
  CardBodyComponent,
  CardComponent,
  ColComponent,
  RowComponent,
} from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';

import { WidgetsDropdownComponent } from '../widgets/widgets-dropdown/widgets-dropdown.component';
import { SchoolStateStore } from '../../store/school.store';
import { SchoolRepository } from '../../repositories/school.repo';
import { AcademicYear } from '../../models/academic-year.model';
import { SessionStateStore } from '../../store/session.store';
import { CommonModule } from '@angular/common';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  imports: [
    WidgetsDropdownComponent,
    CardComponent,
    CardBodyComponent,
    RowComponent,
    ColComponent,
    ChartjsComponent,
    CommonModule,
  ],
})
export class DashboardComponent implements OnInit {
  public schoolStore = inject(SchoolStateStore);
  private adminRepo = inject(AdmisionManagementRepository);
  private sessionStore = inject(SessionStateStore);

  chartPolarAreaData: ChartData = {
    labels: ['Students Enrolled', 'Students Not Enrolled', 'Students Admitted'],
    datasets: [
      {
        data: [16, 7, 14],
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
      },
    ],
  };

  options = {
    maintainAspectRatio: false,
  };

  placementByResidencyOptions = {
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Distribution by Programme and Gender',
      },
    },
    responsive: true,
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  chartBarData: ChartData = {
    labels: ['Current balance', 'Withdrawals'],
    datasets: [
      {
        label: 'Your cash at hand',
        backgroundColor: ['#36A2EB', '#FF6384'],
        data: [1623, 456],
      },
    ],
  };

  placementByProgramme: ChartData = {
    labels: [
      'Agriculture',
      'Business',
      'General Arts',
      'General Science',
      'Home Economics',
      'Visual Arts',
    ],
    datasets: [
      {
        label: 'Placement by programme',
        backgroundColor: [
          '#FF6384',
          '#FF6384',
          '#FF6384',
          '#FF6384',
          '#FF6384',
        ],
        data: [50, 70, 250, 120, 180, 125],
      },
    ],
  };

  placementByGender: ChartData = {
    labels: ['Female', 'Male'],
    datasets: [
      {
        label: 'Placement by gender',
        backgroundColor: ['#FFCE56', '#36A2EB'],
        data: [450, 280],
      },
    ],
  };

  placementByProgrammeAndGender: ChartData = {
    labels: [
      'Agriculture',
      'Business',
      'General Arts',
      'General Science',
      'Home Economics',
      'Visual Arts',
    ],
    datasets: [
      {
        label: 'Male',
        backgroundColor: ['#01579B'],
        data: [32, 30, 100, 78, 15, 106],
        stack: '0',
      },
      {
        label: 'Female',
        backgroundColor: ['#FF6F00'],
        data: [10, 17, 230, 113, 180, 60],
        stack: '1',
      },
    ],
  };

  async ngOnInit() {
    const data = await this.adminRepo.getAdmissionNumberPrefix(
      Number(this.sessionStore.sessionSchool().id)
    );
    this.schoolStore.setCurrentAcademicYear(data.academicYear as AcademicYear);
  }
}
