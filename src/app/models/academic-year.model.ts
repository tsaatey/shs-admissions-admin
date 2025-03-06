import { AcademicYearDto } from '../interfaces/academic-year.dto';

export class AcademicYear {
  startYear: string;
  endYear: string;
  name: string;
  createdAt: string;
  updatedAt: string;

  constructor(academicYear?: AcademicYearDto) {
    this.startYear = academicYear?.startYear || '';
    this.endYear = academicYear?.endYear || '';
    this.name = academicYear?.name || '';
    this.createdAt = academicYear?.createdAt || '';
    this.updatedAt = academicYear?.updatedAt || '';
  }
}
