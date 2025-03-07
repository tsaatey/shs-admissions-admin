import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {
  CardComponent,
  CardBodyComponent,
  RowComponent,
  ColComponent,
  ButtonDirective,
  FormModule,
} from '@coreui/angular';

@Component({
    selector: 'app-enrolled-students',
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
    templateUrl: './enrolled-students.component.html',
    styleUrl: './enrolled-students.component.scss'
})
export class EnrolledStudentsComponent {
  public academicYear = '2024/2025';

  public displayedColumns: string[] = [
    'jhsIndexNumber',
    'name',
    'gender',
    'residentialStatus',
    'grade',
    'programmeOffered',
    'track',
  ];
}
