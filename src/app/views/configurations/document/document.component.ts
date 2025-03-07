import { MatMenuModule } from '@angular/material/menu';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-document',
    imports: [
        CardComponent,
        CardBodyComponent,
        RowComponent,
        ColComponent,
        ButtonDirective,
        FormModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        MatMenuModule,
        CommonModule,
    ],
    templateUrl: './document.component.html',
    styleUrl: './document.component.scss'
})
export class DocumentComponent {
  public documentColumns: string[] = ['name', 'uploadedOn', 'action'];
}
