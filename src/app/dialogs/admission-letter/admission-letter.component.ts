import { ToastrService } from 'ngx-toastr';
import {
  CardModule,
  ColComponent,
  FormModule,
  RowComponent,
} from '@coreui/angular';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { AdmisionManagementRepository } from '../../repositories/admission-management.repo';
import { SchoolRepository } from '../../repositories/school.repo';

@Component({
  selector: 'app-admission-letter',
  imports: [
    MatDialogModule,
    MatButtonModule,
    RowComponent,
    ColComponent,
    CardModule,
    ReactiveFormsModule,
    CommonModule,
    FormModule,
  ],
  templateUrl: './admission-letter.component.html',
  styleUrl: './admission-letter.component.scss',
})
export class AdmissionLetterComponent {
  public loading = new BehaviorSubject<boolean>(false);
  private dialogRef = inject(MatDialogRef<AdmissionLetterComponent>);
  private toastr = inject(ToastrService);
  public fileChosen = new BehaviorSubject<boolean>(false);
  private schoolId = inject(MAT_DIALOG_DATA);
  private schoolRepo = inject(SchoolRepository);

  private admissionLetter!: File;

  onFileChosen(event: any) {
    if (event.target.files.length > 0) {
      this.admissionLetter = event.target.files[0];
      this.fileChosen.next(true);
    } else {
      this.fileChosen.next(false);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  async onUploadLetter() {
    // Start loading
    this.loading.next(true);

    try {
      const formData = new FormData();
      formData.append('file', this.admissionLetter);
      formData.append('schoolId', this.schoolId);

      // Submit data to server
      await this.schoolRepo.uploadAdmissionLetter(formData);

      // Stop loading
      this.loading.next(false);

      // Close dialog
      this.dialogRef.close(true);
    } catch (error: any) {
      // Stop loading
      this.loading.next(false);

      // Show error message
      this.toastr.error(error?.error?.message);
    }
  }
}
