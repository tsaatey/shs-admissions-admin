import { AuthStore } from './../../../store/authentication.store';
import { ToastrService } from 'ngx-toastr';
import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  CardComponent,
  CardBodyComponent,
  RowComponent,
  ColComponent,
  ButtonDirective,
  FormModule,
} from '@coreui/angular';
import { BehaviorSubject } from 'rxjs';
import { STUDENT_TYPE } from '../../../enums/student-type.enums';
import { StudentExcelFormat } from '../../../models/student-excel-model';
import { Student } from '../../../models/student.model';
import { StudentRepository } from '../../../repositories/student.repo';
import { SchoolStateStore } from '../../../store/school.store';
import { SessionStateStore } from '../../../store/session.store';
import { getFormattedStudentForExcel } from '../../../utils/func-utils';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debouncedSignal } from '../../../utils/debounce.utils';
import dayjs from 'dayjs';
import { ExcelExporterService } from '../../../services/excel-exporter.service';

@Component({
  selector: 'app-not-enrolled-students',
  imports: [
    CardComponent,
    CardBodyComponent,
    RowComponent,
    ColComponent,
    MatIconModule,
    ButtonDirective,
    FormModule,
    MatTableModule,
    MatPaginatorModule,
    CommonModule,
    MatButtonModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './not-enrolled-students.component.html',
  styleUrl: './not-enrolled-students.component.scss',
})
export class NotEnrolledStudentsComponent implements OnInit, AfterViewChecked {
  public schoolStore = inject(SchoolStateStore);
  private studentRepo = inject(StudentRepository);
  private sessionStore = inject(SessionStateStore);
  private cdf = inject(ChangeDetectorRef);
  private excelService = inject(ExcelExporterService);
  private formBuilder = inject(FormBuilder);
  private toastr = inject(ToastrService);
  private authStore = inject(AuthStore);

  public loading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public searching: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public enableDownload: BehaviorSubject<boolean> = new BehaviorSubject(false);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public dataSource = new MatTableDataSource<StudentExcelFormat>([]);

  private students: StudentExcelFormat[] = [];

  public displayedColumns: string[] = [
    'jhsIndexNumber',
    'admissionNumber',
    'name',
    'gender',
    'residentialStatus',
    'grade',
    'programOffered',
    'track',
    'action',
  ];

  public searchInput = '';
  public searchForm: any;

  public isEnrolling = '';

  async ngOnInit() {
    this.searchForm = this.formBuilder.group({
      search: ['', Validators.nullValidator],
    });

    // Start loading
    this.loading.next(true);

    const res = await this.studentRepo.getStudentList(
      Number(this.sessionStore.sessionSchool().id),
      STUDENT_TYPE.NOT_ENROLLED
    );

    res.forEach((element: Student) => {
      const data = getFormattedStudentForExcel(element);
      this.students.push(new StudentExcelFormat(data));
    });

    this.dataSource.data = this.students;
    if (this.dataSource.data.length > 0) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }

    // Hide loader
    this.loading.next(false);

    // Show the download button after data is loaded
    setTimeout(() => {
      this.enableDownload.next(true);
    }, 700);
  }

  ngAfterViewChecked(): void {
    this.cdf.detectChanges();
  }

  async onSearchStudent() {
    const searchTerm = this.searchForm.get('search')?.value.trim() || '';

    this.searching.next(true);
    const res = await this.studentRepo.searchStudent(
      Number(this.sessionStore.sessionSchool().id),
      searchTerm
    );

    this.dataSource.data = res;
    if (this.dataSource.data.length > 0) {
      this.dataSource.paginator = this.paginator;
    }

    this.searching.next(false);
  }

  onResetSearch() {
    if (!this.searchInput) {
      this.searching.next(false);
      this.dataSource.data = this.students;
      if (this.dataSource.data.length > 0) {
        this.dataSource.paginator = this.paginator;
      }
    }
  }

  async onDownloadStudentList() {
    const excel = await this.excelService.generateExcelFromJSON(
      this.students,
      'Enrolled Students'
    );
    const fileName =
      this.sessionStore.sessionSchool().schoolCode +
      '_' +
      'enrolled_students' +
      dayjs().format('YYYY-MM-DD HH:mm:ss') +
      '.xlsx';
    const link = document.createElement('a');
    link.href = URL.createObjectURL(excel);
    link.download = fileName;
    link.click();
    link.remove();
  }

  async onEnrollStudent(student: StudentExcelFormat) {
    // Start enrolling
    this.isEnrolling = student.jhsIndexNumber;

    try {
      // Enroll student
      await this.studentRepo.enrollStudent(
        this.sessionStore.sessionSchool().schoolCode,
        student.jhsIndexNumber,
        this.authStore.jwt(),
        Number(this.sessionStore.sessionSchool().id)
      );

      // Display success message
      this.toastr.success(
        `Student with JHS Index Number ${student.jhsIndexNumber} has been enrolled successfully.`,
        'Success'
      );

      // Stop enrolling
      this.isEnrolling = '';

      // Remove enrolled student from list
      this.dataSource.data = this.dataSource.data.filter(
        (s) => s.jhsIndexNumber !== student.jhsIndexNumber
      );

      if (this.dataSource.data) {
        this.dataSource.paginator = this.paginator;
      }
    } catch (error: any) {
      this.toastr.error(
        `Failed to enroll student with JHS Index Number ${
          student.jhsIndexNumber
        }. ${error?.error?.message || error?.message || 'Unknown error'}`
      );

      // Stop enrolling
      this.isEnrolling = '';
    }
  }
}
