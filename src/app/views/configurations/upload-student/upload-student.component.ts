import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  ColComponent,
  FormModule,
  RowComponent,
} from '@coreui/angular';

@Component({
    selector: 'app-upload-student',
    imports: [
        CardComponent,
        CardBodyComponent,
        RowComponent,
        ColComponent,
        ButtonDirective,
        FormModule,
        ReactiveFormsModule,
    ],
    templateUrl: './upload-student.component.html',
    styleUrl: './upload-student.component.scss'
})
export class UploadStudentComponent {}
