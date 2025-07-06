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
import {
  CSSPSStudent,
  StudentExcelFormat,
} from '../../models/student-excel-model';
import { LoaderService } from '../../services/loader.service';
import { StatCardComponent } from '../../shared/stat-card/stat-card.component';
import { EnrollmentDataChartComponent } from '../../shared/enrollment-data-chart/enrollment-data-chart.component';
import dayjs from 'dayjs';
import { Student } from '../../models/student.model';

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
    EnrollmentDataChartComponent,
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
  public enrolledStudents: StudentExcelFormat[] = [];

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

  public enrollmentLineChartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date/Month',
        },
      },
      y: {
        title: {
          display: true,
          // text: 'Number of Enrolled Students',
        },
        beginAtZero: true,
      },
    },
  };

  public admissionLineChartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date/Month',
        },
      },
      y: {
        title: {
          display: true,
          // text: 'Number of Admitted Students',
        },
        beginAtZero: true,
      },
    },
  };

  public placementByProgramme: any;
  public placementByGender: any;
  public placementByProgrammeAndGender: any;
  public placementByProgrammeAndGenderAndResidency: any;
  public enrollmentByProgrammeAndGenderAndResidency: any;

  public enrollmentLineChartConfig: any;
  public admissionLineChartConfig: any;

  async ngOnInit() {
    // Start loading
    this.loader.showLoader('Loading dashboard data. Please wait...');

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

    // Generate admission line chart
    await this.generateAdmissionLineChart();

    // Hide the loader
    this.loader.hideLoader();
  }

  async getPlacementByProgrammeData() {
    const labels: string[] = [];
    const data: number[] = [];
    const color = '#BA68C8';
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
          backgroundColor: ['#00695C', '#827717'],
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

    const result = res.map((student: CSSPSStudent) =>
      student.programOffered.toLowerCase()
    );
    this.programmes = [...new Set(result)];

    this.placedStudents = res;
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

    this.enrolledStudents = res;

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

      for (const student of this.enrolledStudents) {
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

    this.enrollmentByProgrammeAndGenderAndResidency = {
      labels, // your list of programmes
      datasets: [
        {
          label: 'Male - Day',
          backgroundColor: '#827717',
          data: maleDayData,
          stack: 'Male',
        },
        {
          label: 'Male - Boarding',
          backgroundColor: '#CDDC39',
          data: maleBoardingData,
          stack: 'Male',
        },
        {
          label: 'Female - Day',
          backgroundColor: '#4DB6AC',
          data: femaleDayData,
          stack: 'Female',
        },
        {
          label: 'Female - Boarding',
          backgroundColor: '#00695C',
          data: femaleBoardingData,
          stack: 'Female',
        },
      ],
    };

    this.prepareChartData(res);
  }

  prepareChartData(students: Student[]) {
    const counts = new Map<string, number>();
    const today = dayjs();
    const currentMonth = today.format('YYYY-MM');

    for (const student of students) {
      const date = dayjs(student.createdAt);
      const month = date.format('YYYY-MM');
      let key = '';

      if (month === currentMonth) {
        // Label per day
        key = date.format('MMMM D'); // e.g., "July 3"
      } else {
        // Label per month
        key = date.format('MMMM YYYY'); // e.g., "June 2025"
      }

      counts.set(key, (counts.get(key) || 0) + 1);
    }

    // Sort keys chronologically
    const sortedKeys = Array.from(counts.keys()).sort((a, b) => {
      const aDate = dayjs(a.includes(' ') ? a : `${a} 1`, [
        'MMMM D',
        'MMMM YYYY',
      ]);
      const bDate = dayjs(b.includes(' ') ? b : `${b} 1`, [
        'MMMM D',
        'MMMM YYYY',
      ]);
      return aDate.valueOf() - bDate.valueOf();
    });

    const labels = sortedKeys;
    const data = sortedKeys.map((key) => counts.get(key)!);

    this.enrollmentLineChartConfig = {
      labels,
      datasets: [
        {
          label: 'Number of Enrolled Students',
          data,
          backgroundColor: '#36A2EB',
        },
      ],
    };
  }

  async generateAdmissionLineChart() {
    const counts = new Map<string, number>();
    const today = dayjs();
    const currentMonth = today.format('YYYY-MM');

    const res = (await this.studentRepo.getStudentList(
      Number(this.sessionStore.sessionSchool().id),
      STUDENT_TYPE.ADMITTED_STUDENTS
    )) as Student[];

    for (const student of res) {
      const date = dayjs(student.createdAt);
      const month = date.format('YYYY-MM');
      let key = '';

      if (month === currentMonth) {
        // Label per day
        key = date.format('MMMM D'); // e.g., "July 3"
      } else {
        // Label per month
        key = date.format('MMMM YYYY'); // e.g., "June 2025"
      }

      counts.set(key, (counts.get(key) || 0) + 1);
    }

    // Sort keys chronologically
    const sortedKeys = Array.from(counts.keys()).sort((a, b) => {
      const aDate = dayjs(a.includes(' ') ? a : `${a} 1`, [
        'MMMM D',
        'MMMM YYYY',
      ]);
      const bDate = dayjs(b.includes(' ') ? b : `${b} 1`, [
        'MMMM D',
        'MMMM YYYY',
      ]);
      return aDate.valueOf() - bDate.valueOf();
    });

    const labels = sortedKeys;
    const data = sortedKeys.map((key) => counts.get(key)!);

    this.admissionLineChartConfig = {
      labels,
      datasets: [
        {
          label: 'Number of Admitted Students',
          data,
          backgroundColor: '#FF6384',
        },
      ],
    };
  }
}
