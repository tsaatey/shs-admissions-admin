import { StudentRepository } from './../../repositories/student.repo';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SessionStateStore } from './../../store/session.store';
import { AuthStore } from './../../store/authentication.store';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import {
  CardComponent,
  CardBodyComponent,
  RowComponent,
  ColComponent,
  FormModule,
  ButtonDirective,
  NavModule,
  TabsModule,
  CardHeaderComponent,
} from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { AdmisionManagementRepository } from '../../repositories/admission-management.repo';
import { AdmissionNumberDisplayComponent } from '../../dialogs/admission-number-display/admission-number-display.component';
import { CSSPSStudent } from '../../models/student-excel-model';

@Component({
  selector: 'app-manual-admission',
  imports: [
    CardComponent,
    CardBodyComponent,
    CardHeaderComponent,
    RowComponent,
    ColComponent,
    FormModule,
    ButtonDirective,
    NavModule,
    TabsModule,
    ReactiveFormsModule,
    FormModule,
    CommonModule,
  ],
  templateUrl: './manual-admission.component.html',
  styleUrl: './manual-admission.component.scss',
})
export class ManualAdmissionComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private authStore = inject(AuthStore);
  private sessionStore = inject(SessionStateStore);
  private toastr = inject(ToastrService);
  private adminRepo = inject(AdmisionManagementRepository);
  private dialog = inject(MatDialog);
  private studentRepo = inject(StudentRepository);

  public form: any;
  public addStudentForm: any;
  public generatingAdmissionNumber: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      jhsIndexNumber: ['', Validators.required],
    });

    this.addStudentForm = this.formBuilder.group({
      jhsIndexNumber: ['', Validators.required],
      name: ['', Validators.required],
      gender: ['', Validators.required],
      grade: ['', Validators.required],
      programOffered: ['', Validators.required],
      track: ['', Validators.required],
      residentialStatus: ['', Validators.required],
    });
  }

  async onGenerateAdmissionNumber() {
    // Start loading
    this.generatingAdmissionNumber.next(true);

    try {
      const response = await this.adminRepo.generateAdmissionNumber(
        this.sessionStore.sessionSchool().schoolCode,
        Number(this.sessionStore.sessionSchool().id),
        this.form.value.jhsIndexNumber,
        this.authStore.jwt()
      );

      const data = {
        admissionNumber: response.admissionNumber,
        houseAllocated: response.houseAllocated,
        jhsIndexNumber: response.jhsIndexNumber,
      };

      // Stop loading
      this.generatingAdmissionNumber.next(false);

      // Display success
      this.toastr.success('Admission number generated successfully');

      // Display the admission number details on a modal
      const ref = this.dialog.open(AdmissionNumberDisplayComponent, {
        data: data,
        disableClose: true,
      });

      // Reset form when modal is closed
      ref.afterClosed().subscribe(() => {
        // Reset form
        this.form.reset();
      });
    } catch (error: any) {
      // Stop loading
      this.generatingAdmissionNumber.next(false);

      // Display error message
      this.toastr.error(error?.error?.message);
    }
  }

  async addStudentHandler() {
    // Start loading
    this.loading.next(true);

    try {
      const students: CSSPSStudent[] = [];

      students.push(this.addStudentForm.value);
      await this.studentRepo.uploadStudentsAsJSON(
        Number(this.sessionStore.sessionSchool().id),
        students
      );

      // Stop loading
      this.loading.next(false);

      // Display success
      this.toastr.success('Student added successfully');

      // Reset the form
      this.addStudentForm.reset();
    } catch (error: any) {
      // Stop loading
      this.loading.next(false);

      // Display
      this.toastr.error(error?.error?.message);
    }
  }
}
