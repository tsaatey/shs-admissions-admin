import { LoaderService } from './../../../services/loader.service';
import { STUDENT_TYPE } from './../../../enums/student-type.enums';
import { SchoolRepository } from './../../../repositories/school.repo';
import { SchoolStateStore } from './../../../store/school.store';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
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
  ],
  templateUrl: './all-placed-students.component.html',
  styleUrl: './all-placed-students.component.scss',
})
export class AllPlacedStudentsComponent implements OnInit, AfterViewChecked {
  public schoolStore = inject(SchoolStateStore);
  private studentRepo = inject(StudentRepository);
  private sessionStore = inject(SessionStateStore);
  private cdf = inject(ChangeDetectorRef);
  private loader = inject(LoaderService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

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

  async ngOnInit() {
    // Start loading
    this.loader.showLoader('Loading all students...');
    const res = await this.studentRepo.getStudentList(
      Number(this.sessionStore.sessionSchool().id),
      STUDENT_TYPE.ALL_STUDENTS
    );

    res.content.forEach((element: Student) => {
      const data = getFormattedStudentForExcel(element);
      this.students.push(new StudentExcelFormat(data));
    });

    this.dataSource.data = this.students;
    if (this.dataSource.data.length > 0) {
      this.dataSource.paginator = this.paginator;
    }

    // Hide loader
    this.loader.hideLoader();
  }

  ngAfterViewChecked(): void {
    this.cdf.detectChanges();
  }
}
