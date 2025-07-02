import { SchoolStateStore } from './../../store/school.store';
import { AdmisionManagementRepository } from './../../repositories/admission-management.repo';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  RowComponent,
  ColComponent,
  CardModule,
  FormModule,
} from '@coreui/angular';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-admission-number-format',
  imports: [
    MatDialogModule,
    MatButtonModule,
    RowComponent,
    ColComponent,
    CardModule,
    CommonModule,
    ReactiveFormsModule,
    FormModule,
  ],
  templateUrl: './admission-number-format.component.html',
  styleUrl: './admission-number-format.component.scss',
})
export class AdmissionNumberFormatComponent implements OnInit {
  public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private dialogRef = inject(MatDialogRef<AdmissionNumberFormatComponent>);
  private schoolId = inject(MAT_DIALOG_DATA);
  private formBuilder = inject(FormBuilder);
  private toastr = inject(ToastrService);
  private adminRepo = inject(AdmisionManagementRepository);
  private store = inject(SchoolStateStore);

  public form: any;

  public pattern: string = ''; // User input pattern
  public preview: string = ''; // Generated preview

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      admissionNumberPrefix: ['', Validators.required],
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  async onSetAdmissionNumberPrefix() {
    if (!this.form.valia) {
      // If the form is not valid, do not proceed
      this.toastr.error('Admission number pattern is required.');
      return;
    }

    this.loading.next(true);

    try {
      this.loading.next(true);

      // Form is valid
      const value = this.form.value.admissionNumberPrefix;

      // Contact the server
      await this.adminRepo.setAdmissionNumberPrefix(
        Number(this.schoolId),
        value,
        this.store.currentAcademicYear().startYear
      );

      // Stop loading
      this.loading.next(false);

      // Reset the form
      this.form.reset();

      // Close dialog
      this.dialogRef.close(true);
    } catch (error: any) {
      this.loading.next(false);

      // Show error message
      this.toastr.error(
        error?.error?.message || error?.message || 'Unknown error'
      );
      console.error('Error setting admission number prefix:', error);
    }
  }

  generatePreview() {
    this.pattern = this.form.value.admissionNumberPrefix;
    const serialNumber = '0001'; // Example serial number
    // Replace the asterisks with the serial number
    this.preview = this.pattern.replace(/\*{4}/, serialNumber);
  }
}
