import { ToastrService } from 'ngx-toastr';
import { LoaderService } from './../../services/loader.service';
import { StudentRepository } from './../../repositories/student.repo';
import { StudentExcelFormat } from './../../models/student-excel-model';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  FormModule,
  RowComponent,
} from '@coreui/angular';
import dayjs from 'dayjs';
import { ExcelExporterService } from '../../services/excel-exporter.service';
import { SessionStateStore } from '../../store/session.store';
import { STUDENT_TYPE } from '../../enums/student-type.enums';

@Component({
  selector: 'app-downloads',
  imports: [
    CommonModule,
    CardComponent,
    CardBodyComponent,
    CardHeaderComponent,
    RowComponent,
    ColComponent,
    FormModule,
    ButtonDirective,
  ],
  templateUrl: './downloads.component.html',
  styleUrl: './downloads.component.scss',
})
export class DownloadsComponent {
  private students: StudentExcelFormat[] = [];
  private studentRepo = inject(StudentRepository);
  private excelService = inject(ExcelExporterService);
  private sessionStore = inject(SessionStateStore);
  private loaderService = inject(LoaderService);
  private toastr = inject(ToastrService);

  private studentTypeId: string = '';
  private studentTypeName: string = '';

  async onDownload(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.studentTypeName =
      selectElement.options[selectElement.selectedIndex].text;

    this.studentTypeId = selectElement.value;
  }

  async downloadStudentList() {
    if (this.studentTypeId && this.studentTypeName) {
      this.loaderService.showLoader(
        'Please wait while we generate the file...'
      );
      switch (this.studentTypeId) {
        case 'placed-students':
          this.students = await this.studentRepo.getStudentList(
            Number(this.sessionStore.sessionSchool().id),
            STUDENT_TYPE.ALL_STUDENTS
          );
          await this.generateFile(
            this.students,
            this.studentTypeId,
            this.studentTypeName
          );
          this.loaderService.hideLoader();
          this.toastr.success('File downloaded successfully');
          break;

        case 'admitted-students':
          this.students = await this.studentRepo.getStudentList(
            Number(this.sessionStore.sessionSchool().id),
            STUDENT_TYPE.ADMITTED_STUDENTS
          );

          await this.generateFile(
            this.students,
            this.studentTypeId,
            this.studentTypeName
          );
          this.loaderService.hideLoader();
          this.toastr.success('File downloaded successfully');
          break;

        case 'enrolled-students':
          this.students = await this.studentRepo.getStudentList(
            Number(this.sessionStore.sessionSchool().id),
            STUDENT_TYPE.ENROLLED_STUDENTS
          );
          await this.generateFile(
            this.students,
            this.studentTypeId,
            this.studentTypeName
          );
          this.loaderService.hideLoader();
          this.toastr.success('File downloaded successfully');
          break;

        case 'not-enrolled-students':
          this.students = await this.studentRepo.getStudentList(
            Number(this.sessionStore.sessionSchool().id),
            STUDENT_TYPE.NOT_ENROLLED
          );
          await this.generateFile(
            this.students,
            this.studentTypeId,
            this.studentTypeName
          );
          this.loaderService.hideLoader();
          this.toastr.success('File downloaded successfully');
          break;

        case 'dates-of-birth':
          this.loaderService.showLoader(
            'Please wait while we generate the file...'
          );
          this.students = await this.studentRepo.getStudentList(
            Number(this.sessionStore.sessionSchool().id),
            STUDENT_TYPE.ENROLLED_STUDENTS
          );

          await this.downloadDateOfBirth(
            this.students,
            this.studentTypeId,
            this.studentTypeName
          );
          this.loaderService.hideLoader();
          this.toastr.success('File downloaded successfully');
          break;

        case 'guardian-information':
          this.loaderService.showLoader(
            'Please wait while we generate the file...'
          );
          this.students = await this.studentRepo.getStudentList(
            Number(this.sessionStore.sessionSchool().id),
            STUDENT_TYPE.ENROLLED_STUDENTS
          );

          await this.downloadGuardians(
            this.students,
            this.studentTypeId,
            this.studentTypeName
          );
          this.loaderService.hideLoader();
          this.toastr.success('File downloaded successfully');
          break;
        default:
          this.loaderService.hideLoader();
          this.toastr.error('Please select the category of data to download');
          break;
      }
    } else {
      this.loaderService.hideLoader();
      this.toastr.error('Please select the category of data to download');
    }
  }

  async generateFile(
    students: StudentExcelFormat[],
    studentTypeId: string,
    studentTypeName: string
  ) {
    const excel = await this.excelService.generateExcelFromJSON(
      students,
      studentTypeName
    );
    const fileName =
      this.sessionStore.sessionSchool().schoolCode +
      '_' +
      studentTypeId +
      dayjs().format('YYYY-MM-DD HH:mm:ss') +
      '.xlsx';
    const link = document.createElement('a');
    link.href = URL.createObjectURL(excel);
    link.download = fileName;
    link.click();
    link.remove();
  }

  async downloadDateOfBirth(
    students: StudentExcelFormat[],
    studentTypeId: string,
    studentTypeName: string
  ) {
    const excel = await this.excelService.generateStudentDateOfBirthFile(
      students,
      studentTypeName
    );
    const fileName =
      this.sessionStore.sessionSchool().schoolCode +
      studentTypeId +
      dayjs().format('YYYY-MM-DD HH:mm:ss') +
      '.xlsx';
    const link = document.createElement('a');
    link.href = URL.createObjectURL(excel);
    link.download = fileName;
    link.click();
    link.remove();
  }

  async downloadGuardians(
    students: StudentExcelFormat[],
    studentTypeId: string,
    studentTypeName: string
  ) {
    this.loaderService.showLoader('Please wait while we generate the file...');
    this.students = await this.studentRepo.getStudentList(
      Number(this.sessionStore.sessionSchool().id),
      STUDENT_TYPE.ENROLLED_STUDENTS
    );
    const excel = await this.excelService.generateGuardianInformationFile(
      students,
      studentTypeName
    );
    const fileName =
      this.sessionStore.sessionSchool().schoolCode +
      studentTypeId +
      dayjs().format('YYYY-MM-DD HH:mm:ss') +
      '.xlsx';
    const link = document.createElement('a');
    link.href = URL.createObjectURL(excel);
    link.download = fileName;
    link.click();
    link.remove();
  }
}
