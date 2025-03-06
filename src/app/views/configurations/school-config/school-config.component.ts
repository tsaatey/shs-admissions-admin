import { AfterViewInit, Component, ViewChild, viewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AvatarComponent,
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  FormModule,
  NavModule,
  RowComponent,
  TabsModule,
} from '@coreui/angular';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-school-config',
  standalone: true,
  imports: [
    FormModule,
    ReactiveFormsModule,
    RowComponent,
    ColComponent,
    ButtonDirective,
    CardComponent,
    CardBodyComponent,
    CardHeaderComponent,
    NavModule,
    TabsModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    AvatarComponent,
    MatPaginatorModule,
  ],
  templateUrl: './school-config.component.html',
  styleUrl: './school-config.component.scss',
})
export class SchoolConfigComponent implements AfterViewInit {
  public photoColumns: string[] = ['name', 'preview', 'action'];
  public houseColumns: string[] = [
    'houseName',
    'houseMaster',
    'houseMistress',
    'sex',
    'action',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('housePaginator') housePaginator!: MatPaginator;

  public dataSource = new MatTableDataSource<any>([
    {
      name: 'Test name',
      preview: 'Some url',
    },
  ]);

  public houseDataSource = new MatTableDataSource<any>([
    {
      houseName: 'Tettey Puplampu',
      houseMaster: 'Philip Gor',
      houseMistress: 'Wuddah Cindy',
      sex: 'Unisex',
    },
    {
      houseName: 'Alex Tetttey-Enyo',
      houseMaster: 'Sampson Bill',
      houseMistress: 'Chester Orion',
      sex: 'Unisex',
    },
  ]);

  constructor() {}

  ngAfterViewInit(): void {
    if (this.dataSource.data.length > 0) {
      this.dataSource.paginator = this.paginator;
    }

    this.houseDataSource.paginator = this.housePaginator;
  }
}
