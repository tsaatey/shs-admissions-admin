import { STUDENT_TYPE } from './../../../enums/student-type.enums';
import { SchoolStateStore } from './../../../store/school.store';
import {
  AfterViewChecked,
  Component,
  inject,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  effect,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  ColComponent,
  FormModule,
  RowComponent,
} from '@coreui/angular';
import { StudentExcelFormat } from '../../../models/student-excel-model';
import { StudentRepository } from '../../../repositories/student.repo';
import { SessionStateStore } from '../../../store/session.store';
import { Student } from '../../../models/student.model';
import { getFormattedStudentForExcel } from '../../../utils/func-utils';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { debouncedSignal } from '../../../utils/debounce.utils';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ExcelExporterService } from '../../../services/excel-exporter.service';
import dayjs from 'dayjs';

@Component({
  selector: 'app-all-placed-students',
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
    MatIconModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './all-placed-students.component.html',
  styleUrl: './all-placed-students.component.scss',
})
export class AllPlacedStudentsComponent implements OnInit, AfterViewChecked {
  public schoolStore = inject(SchoolStateStore);
  private studentRepo = inject(StudentRepository);
  private sessionStore = inject(SessionStateStore);
  private cdf = inject(ChangeDetectorRef);
  private excelService = inject(ExcelExporterService);
  private formBuilder = inject(FormBuilder);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public dataSource = new MatTableDataSource<StudentExcelFormat>([]);

  private students: StudentExcelFormat[] = [];

  public displayedColumns: string[] = [
    'jhsIndexNumber',
    'name',
    'gender',
    'residentialStatus',
    'grade',
    'programOffered',
    'track',
  ];

  public loading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public searching: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public enableDownload: BehaviorSubject<boolean> = new BehaviorSubject(false);

  searchInput = '';
  public searchForm: any;

  async ngOnInit() {
    // Initialize search form
    this.searchForm = this.formBuilder.group({
      search: ['', Validators.nullValidator],
    });

    // Start loading
    this.loading.next(true);

    const res = await this.studentRepo.getStudentList(
      Number(this.sessionStore.sessionSchool().id),
      STUDENT_TYPE.ALL_STUDENTS
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
      'All Placed Students'
    );
    const fileName =
      this.sessionStore.sessionSchool().schoolCode +
      '_' +
      'all_placed_students' +
      dayjs().format('YYYY-MM-DD HH:mm:ss') +
      '.xlsx';
    const link = document.createElement('a');
    link.href = URL.createObjectURL(excel);
    link.download = fileName;
    link.click();
    link.remove();
  }
}
