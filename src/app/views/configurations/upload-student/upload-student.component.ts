import { ToastrService } from 'ngx-toastr';
import { StudentRepository } from './../../../repositories/student.repo';
import { SessionStateStore } from './../../../store/session.store';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  FormModule,
  RowComponent,
} from '@coreui/angular';
import { CSSPSStudent } from '../../../models/student-excel-model';
import { ExcelExporterService } from '../../../services/excel-exporter.service';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MoreInformationComponent } from '../../../dialogs/more-information/more-information.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-upload-student',
  imports: [
    CardComponent,
    CardBodyComponent,
    CardHeaderComponent,
    RowComponent,
    ColComponent,
    ButtonDirective,
    FormModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './upload-student.component.html',
  styleUrl: './upload-student.component.scss',
})
export class UploadStudentComponent implements OnInit {
  private store = inject(SessionStateStore);
  private studentRepo = inject(StudentRepository);
  public form: any;
  private formBuilder = inject(FormBuilder);
  private excelService = inject(ExcelExporterService);
  private toastr = inject(ToastrService);
  private sanitizer = inject(DomSanitizer);
  private dialog = inject(MatDialog);

  public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  private selectedFile!: File;

  uploadStudentInfo: any;

  htmlText!: SafeHtml;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      file: [null, Validators.required],
    });

    const text = `
    <p>
      Format student data in th excel file in a chronological order per the following headings: 
      JHS Index Number, Name, Gender, Aggregate, Programme, Track, Residential Status. 
      Make sure the index number ends with the last two digits of the year of completion. 
      Refer to the table below
    </p>
    
    <h6>How the headers are supposed to be used</h6>
    <table class="table table-responsive table-striped table-bordered">
      <thead>
        <tr>
          <th scope="col">JHS Index Number</th>
          <th scope="col">Name</th>
          <th scope="col">Gender</th>
          <th scope="col">Aggregate</th>
          <th scope="col">Programme</th>
          <th scope="col">Track</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>010134562324</td>
          <td>Kabutey Janet Adjowa</td>
          <td>Female</td>
          <td>12</td>
          <td>General Arts</td>
          <td>Single</td>
          <td>Boarding</td>
        </tr>
        <tr>
          <td>012113456024</td>
          <td>Kwao Daniel Teye</td>
          <td>Male</td>
          <td>17</td>
          <td>General Arts</td>
          <td>Single</td>
          <td>Boarding</td>
        </tr>
      </tbody>
    </table>
    `;

    this.htmlText = this.sanitizer.bypassSecurityTrustHtml(text);

    this.uploadStudentInfo = {
      title: 'Upload Student Excel Format',
      text: this.htmlText,
    };
  }

  onFileChange(event: any) {
    const file: File = event.target.files?.[0];
    if (!file) {
      console.error('No file selected.');
      return;
    }
    this.selectedFile = file;
  }

  async onUploadStudents() {
    // Start loading
    this.loading.next(false);

    try {
      // Get the students data
      const students: CSSPSStudent[] =
        await this.excelService.extractStudentExcelToJson(this.selectedFile);

      // Make request to server
      await this.studentRepo.uploadStudentsAsJSON(
        Number(this.store.sessionSchool().id),
        students
      );

      // Stop loading
      this.loading.next(true);

      // Display success message
      this.toastr.success('Students uploaded successfully');

      // Reset the form
      this.form.reset();
    } catch (error: any) {
      // Stop loading
      this.loading.next(false);

      // Display
      this.toastr.error(
        error?.error?.message || error?.message || 'Unknown error'
      );
    }
  }

  onLearnMore() {
    this.dialog.open(MoreInformationComponent, {
      data: this.uploadStudentInfo,
    });
  }
}
