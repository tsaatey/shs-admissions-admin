import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
import { CSSPSStudent } from '../models/student-excel-model';

@Injectable({ providedIn: 'root' })
export class ExcelExporterService {
  async extractStudentExcelToJson(file: File): Promise<any[]> {
    const workbook = new ExcelJS.Workbook();
    const buffer = await file.arrayBuffer();
    await workbook.xlsx.load(buffer);

    const worksheet = workbook.getWorksheet(1); // First worksheet
    const students: CSSPSStudent[] = [];

    console.log(buffer);

    let headers: string[] = [];

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
}
