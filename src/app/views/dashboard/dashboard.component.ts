import { MatTableModule } from '@angular/material/table';
import { GhanaCediFormatPipe } from './../../pipes/ghana-cedi-format.pipe';
import { SchoolRepository } from './../../repositories/school.repo';
import { STUDENT_TYPE } from './../../enums/student-type.enums';
import { StudentRepository } from './../../repositories/student.repo';
import { AdmisionManagementRepository } from './../../repositories/admission-management.repo';
import { Component, inject, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import {
  CardBodyComponent,
  CardComponent,
  ColComponent,
  RowComponent,
  TableModule,
} from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';

import { WidgetsDropdownComponent } from '../widgets/widgets-dropdown/widgets-dropdown.component';
import { SchoolStateStore } from '../../store/school.store';
import { AcademicYear } from '../../models/academic-year.model';
import { SessionStateStore } from '../../store/session.store';
import { CommonModule } from '@angular/common';
import { CSSPSStudent } from '../../models/student-excel-model';
import { LoaderService } from '../../services/loader.service';
import { StatCardComponent } from '../../shared/stat-card/stat-card.component';

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
    StatCardComponent,
    GhanaCediFormatPipe,
    TableModule,
  ],
})
export class DashboardComponent implements OnInit {
  public schoolStore = inject(SchoolStateStore);
  private adminRepo = inject(AdmisionManagementRepository);
  private sessionStore = inject(SessionStateStore);
  private studentRepo = inject(StudentRepository);
  private loader = inject(LoaderService);
  private schoolRepo = inject(SchoolRepository);

  private programmes: any;
  private placedStudents: CSSPSStudent[] = [];

  public revenueData!: any;

  public options = {
    maintainAspectRatio: false,
  };

  public placementByProgrammeAndGenderOptions = {
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

  public enrollmentByProgrammeAndGenderAndResidencyOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Distribution by Programme, Gender and Residency',
      },
      tooltip: {
        intersect: false,
      },
    },
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };

  public placementByProgramme: any;
  public placementByGender: any;
  public placementByProgrammeAndGender: any;
  public placementByProgrammeAndGenderAndResidency: any;

  async ngOnInit() {
    // Start loading
    this.loader.showLoader('Loading dashboard data...');

    // Get current academic calendar
    const data = await this.adminRepo.getAdmissionNumberPrefix(
      Number(this.sessionStore.sessionSchool().id)
    );
    this.schoolStore.setCurrentAcademicYear(data.academicYear as AcademicYear);

    // Get programmes and list of students placed
    await this.getProgrammesAndStudentsPlaced();

    // Get chart data for placement by programme
    await this.getPlacementByProgrammeData();

    // Get chart data for placement by gender
    await this.getPlacementByGenderData();

    // Get data for placement by programme and gender
    await this.getPlacementByProgrammeAndGenderData();

    // Get revenue data
    const res = await this.schoolRepo.getDashboardData(
      this.sessionStore.sessionSchool().id
    );
    this.revenueData = res.revenue;

    // Get data for enrollment distribution chart
    await this.getEnrollmentByProgrammeAndGenderAndResidency();

    // Hide the loader
    this.loader.hideLoader();
  }

  async getPlacementByProgrammeData() {
    const labels: string[] = [];
    const data: number[] = [];
    const color = '#FF6384';
    const backgroundColor: string[] = [];

    this.programmes.forEach((programme: string) => {
      labels.push(programme.toUpperCase());
      backgroundColor.push(color);
      let totalStudents = 0;

      for (const student of this.placedStudents) {
        if (student.programOffered.toLowerCase() === programme) {
          totalStudents += 1;
        }
      }
      data.push(totalStudents);
    });

    this.placementByProgramme = {
      labels,
      datasets: [
        {
          label: 'By programme',
          backgroundColor,
          data,
        },
      ],
    };
  }

  async getPlacementByGenderData() {
    let totalMale = 0;
    let totalFemale = 0;

    this.placedStudents.forEach((student: CSSPSStudent) => {
      if (student.gender.toLowerCase() === 'male') {
        totalMale += 1;
      } else if (student.gender.toLowerCase() === 'female') {
        totalFemale += 1;
      }
    });
    this.placementByGender = {
      labels: ['Female', 'Male'],
      datasets: [
        {
          label: 'By gender',
          backgroundColor: ['#FFCE56', '#36A2EB'],
          data: [totalFemale, totalMale],
        },
      ],
    };
  }

  async getProgrammesAndStudentsPlaced() {
    const res = await this.studentRepo.getStudentList(
      Number(this.sessionStore.sessionSchool().id),
      STUDENT_TYPE.ALL_STUDENTS
    );

    const result = res.content.map((student: CSSPSStudent) =>
      student.programOffered.toLowerCase()
    );
    this.programmes = [...new Set(result)];

    this.placedStudents = res.content;
  }

  async getPlacementByProgrammeAndGenderData() {
    const labels: string[] = [];
    const femaleData: number[] = [];
    const maleData: number[] = [];

    this.programmes.forEach((programme: string) => {
      let totalMale = 0;
      let totalFemale = 0;

      labels.push(programme.toUpperCase());

      for (const student of this.placedStudents) {
        if (
          student.programOffered.toLowerCase() === programme &&
          student.gender.toLowerCase() === 'male'
        ) {
          totalMale += 1;
        } else if (
          student.programOffered.toLowerCase() === programme &&
          student.gender.toLowerCase() === 'female'
        ) {
          totalFemale += 1;
        }
      }
      femaleData.push(totalFemale);
      maleData.push(totalMale);
    });

    this.placementByProgrammeAndGender = {
      labels,
      datasets: [
        {
          label: 'Male',
          backgroundColor: ['#01579B'],
          data: maleData,
          stack: '0',
        },
        {
          label: 'Female',
          backgroundColor: ['#FF6F00'],
          data: femaleData,
          stack: '1',
        },
      ],
    };
  }

  async getEnrollmentByProgrammeAndGenderAndResidency() {
    const res = await this.studentRepo.getStudentList(
      Number(this.sessionStore.sessionSchool().id),
      STUDENT_TYPE.ENROLLED_STUDENTS
    );

    const result = res.content.map((student: CSSPSStudent) =>
      student.programOffered.toLowerCase()
    );
    const programmes = [...new Set(result)];

    const EnrolledStudents = res.content;

    const labels: string[] = [];
    const femaleDayData: number[] = [];
    const femaleBoardingData: number[] = [];
    const maleDayData: number[] = [];
    const maleBoardingData: number[] = [];

    this.programmes.forEach((programme: string) => {
      let totalMaleDay = 0;
      let totalMaleBoarding = 0;
      let totalFemaleDay = 0;
      let totalFemaleBoarding = 0;

      labels.push(programme.toUpperCase());

      for (const student of this.placedStudents) {
        if (
          student.programOffered.toLowerCase() === programme &&
          student.gender.toLowerCase() === 'male' &&
          student.residentialStatus.toLowerCase() === 'day'
        ) {
          totalMaleDay += 1;
        } else if (
          student.programOffered.toLowerCase() === programme &&
          student.gender.toLowerCase() === 'male' &&
          student.residentialStatus.toLowerCase() === 'boarding'
        ) {
          totalMaleBoarding += 1;
        } else if (
          student.programOffered.toLowerCase() === programme &&
          student.gender.toLowerCase() === 'female' &&
          student.residentialStatus.toLowerCase() === 'day'
        ) {
          totalFemaleDay += 1;
        } else if (
          student.programOffered.toLowerCase() === programme &&
          student.gender.toLowerCase() === 'female' &&
          student.residentialStatus.toLowerCase() === 'boarding'
        ) {
          totalFemaleBoarding += 1;
        }
      }
      femaleDayData.push(totalFemaleDay);
      femaleBoardingData.push(totalFemaleBoarding);
      maleDayData.push(totalMaleDay);
      maleBoardingData.push(totalMaleBoarding);
    });

    this.placementByProgrammeAndGenderAndResidency = {
      labels, // your list of programmes
      datasets: [
        {
          label: 'Male - Day',
          backgroundColor: '#64B5F6',
          data: maleDayData,
          stack: 'Male',
        },
        {
          label: 'Male - Boarding',
          backgroundColor: '#1976D2',
          data: maleBoardingData,
          stack: 'Male',
        },
        {
          label: 'Female - Day',
          backgroundColor: '#FFB74D',
          data: femaleDayData,
          stack: 'Female',
        },
        {
          label: 'Female - Boarding',
          backgroundColor: '#F57C00',
          data: femaleBoardingData,
          stack: 'Female',
        },
      ],
    };
  }
}
