import { Component, Input, OnChanges } from '@angular/core';
import {
  CSSPSStudent,
  StudentExcelFormat,
} from '../../models/student-excel-model';
import { CommonModule } from '@angular/common';

interface Student {
  programme: string;
  residency: 'DAY' | 'BOARDING';
  gender: 'MALE' | 'FEMALE';
}

interface ProgrammeData {
  name: string;
  day: {
    male: number;
    female: number;
    total: number;
  };
  boarding: {
    male: number;
    female: number;
    total: number;
  };
  overallTotal: number;
}

@Component({
  selector: 'app-enrollment-data-chart',
  imports: [CommonModule],
  templateUrl: './enrollment-data-chart.component.html',
  styleUrl: './enrollment-data-chart.component.scss',
})
export class EnrollmentDataChartComponent implements OnChanges {
  /**
   * Input data for the component, expected to be an array of CSSPSStudent objects.
   * This data will be used to calculate and display enrollment statistics.
   */
  @Input() studentData: StudentExcelFormat[] = [];

  programmeTotals: ProgrammeData[] = [];
  grandTotals = {
    dayMale: 0,
    dayFemale: 0,
    dayTotal: 0,
    boardingMale: 0,
    boardingFemale: 0,
    boardingTotal: 0,
    overallTotal: 0,
  };

  ngOnChanges() {
    console.log('Student Data:', this.studentData);
    this.calculateTotals();
  }

  private calculateTotals() {
    // Reset totals
    this.programmeTotals = [];
    this.grandTotals = {
      dayMale: 0,
      dayFemale: 0,
      dayTotal: 0,
      boardingMale: 0,
      boardingFemale: 0,
      boardingTotal: 0,
      overallTotal: 0,
    };

    // Group by programme
    const programmes = new Set(this.studentData.map((s) => s.programOffered));

    programmes.forEach((programme) => {
      const programmeStudents = this.studentData.filter(
        (s) => s.programOffered === programme
      );

      const dayStudents = programmeStudents.filter(
        (s) => s.residentialStatus.toUpperCase() === 'DAY'
      );
      const boardingStudents = programmeStudents.filter(
        (s) => s.residentialStatus.toUpperCase() === 'BOARDING'
      );

      const dayMale = dayStudents.filter(
        (s) => s.gender.toUpperCase() === 'MALE'
      ).length;
      const dayFemale = dayStudents.filter(
        (s) => s.gender.toUpperCase() === 'FEMALE'
      ).length;
      const dayTotal = dayStudents.length;

      const boardingMale = boardingStudents.filter(
        (s) => s.gender.toUpperCase() === 'MALE'
      ).length;
      const boardingFemale = boardingStudents.filter(
        (s) => s.gender.toUpperCase() === 'FEMALE'
      ).length;
      const boardingTotal = boardingStudents.length;

      const overallTotal = programmeStudents.length;

      this.programmeTotals.push({
        name: programme,
        day: { male: dayMale, female: dayFemale, total: dayTotal },
        boarding: {
          male: boardingMale,
          female: boardingFemale,
          total: boardingTotal,
        },
        overallTotal,
      });

      // Update grand totals
      this.grandTotals.dayMale += dayMale;
      this.grandTotals.dayFemale += dayFemale;
      this.grandTotals.dayTotal += dayTotal;
      this.grandTotals.boardingMale += boardingMale;
      this.grandTotals.boardingFemale += boardingFemale;
      this.grandTotals.boardingTotal += boardingTotal;
      this.grandTotals.overallTotal += overallTotal;
    });
  }
}
