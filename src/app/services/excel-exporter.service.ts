import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
import {
  CSSPSStudent,
  StudentExcelFormat,
} from '../models/student-excel-model';
import { formattedExcelHeaders } from '../data/full-excel-headers';

@Injectable({ providedIn: 'root' })
export class ExcelExporterService {
  async extractStudentExcelToJson(file: File): Promise<any[]> {
    const workbook = new ExcelJS.Workbook();
    const buffer = await file.arrayBuffer();
    await workbook.xlsx.load(buffer);

    const worksheet = workbook.getWorksheet(1); // First worksheet
    const students: CSSPSStudent[] = [];

    worksheet?.eachRow((row, rowIndex) => {
      if (rowIndex === 1) return; // Skip header row (if present)

      const values = row.values as any[];

      const student = new CSSPSStudent({
        jhsIndexNumber: values[1]?.toString().trim() || '',
        name: values[2]?.toString().trim() || '',
        gender: values[3]?.toString().trim() || '',
        grade: Number(values[4]) || 0,
        programOffered: values[5]?.toString().trim() || '',
        track: values[6]?.toString().trim() || '',
        residentialStatus: values[7]?.toString().trim() || '',
      });

      if (student.jhsIndexNumber) {
        students.push(student);
      }
    });

    return students;
  }

  async generateExcelFromJSON(
    students: StudentExcelFormat[],
    sheetTitle: string
  ) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetTitle);

    // Define headers based on CSSPSStudent properties
    worksheet.columns = formattedExcelHeaders;

    // Add each student as a row
    students.forEach((student) => {
      worksheet.addRow({
        jhsIndexNumber: student.jhsIndexNumber,
        admissionNumber: student.admissionNumber,
        admissionYear: student.admissionYear,
        imageUrl: student.imageUrl,
        name: student.name,
        gender: student.gender,
        dateOfBirth: student.dateOfBirth,
        programOffered: student.programOffered,
        track: student.track,
        residentialStatus: student.residentialStatus,
        placeOfBirth: student.placeOfBirth,
        nationality: student.nationality,
        hometown: student.hometown,
        region: student.region,
        religiousDenomination: student.religiousDenomination,
        address: student.address,
        phoneNumber: student.phoneNumber,
        lastSchoolAttended: student.lastSchoolAttended,
        addressOfLastSchoolAttended: student.addressOfLastSchoolAttended,
        physicalChallenge: student.physicalChallenge,
        nameOfFather: student.nameOfFather,
        occupationOfFather: student.occupationOfFather,
        addressOfFather: student.addressOfFather,
        phoneNumberOfFather: student.phoneNumberOfFather,
        nameOfMother: student.nameOfMother,
        occupationOfMother: student.occupationOfMother,
        addressOfMother: student.addressOfMother,
        phoneNumberOfMother: student.phoneNumberOfMother,
        nameOfGuardian: student.nameOfGuardian,
        occupationOfGuardian: student.occupationOfGuardian,
        phoneNumberOfGuardian: student.phoneNumberOfGuardian,
        altPhoneNumberOfGuardian: student.altPhoneNumberOfGuardian,
        postalAddressOfGuardian: student.postalAddressOfGuardian,
        residentialAddressOfGuardian: student.residentialAddressOfGuardian,
        admissionStatus: student.admissionStatus,
        grade: student.grade,
        score: student.score,
        enrolmentCode: student.enrolmentCode,
        enrolmentStatus: student.enrolmentStatus,
        currentLevel: student.currentLevel,
        assignedHouse: student.assignedHouse,
        dateTimeAdmitted: student.dateTimeAdmitted,
      });
    });

    // Style header row
    worksheet.getRow(1).font = { bold: true };

    // Generate the Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    return new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
  }
}
