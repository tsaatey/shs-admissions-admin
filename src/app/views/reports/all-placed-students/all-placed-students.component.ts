import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  ColComponent,
  FormModule,
  RowComponent,
} from '@coreui/angular';

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
    styleUrl: './all-placed-students.component.scss'
})
export class AllPlacedStudentsComponent {
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
