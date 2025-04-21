import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { AdmisionManagementRepository } from '../../repositories/admission-management.repo';
import { SchoolStateStore } from '../../store/school.store';
import { AdmissionNumberFormatComponent } from '../admission-number-format/admission-number-format.component';

@Component({
  selector: 'app-cost-of-voucher',
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
  templateUrl: './cost-of-voucher.component.html',
  styleUrl: './cost-of-voucher.component.scss',
})
export class CostOfVoucherComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<AdmissionNumberFormatComponent>);
  private schoolId = inject(MAT_DIALOG_DATA);
  private formBuilder = inject(FormBuilder);
  private toastr = inject(ToastrService);
  private adminRepo = inject(AdmisionManagementRepository);

  public form: any;

  public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      costOfVoucher: ['', Validators.required],
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  async onSetCostOfVoucher() {
    if (this.form.valid) {
      this.loading.next(true);
      // Process form
      try {
        const value = this.form.value.costOfVoucher;

        await this.adminRepo.setCostOfVoucher(
          Number(this.schoolId),
          Number(value)
        );
        this.loading.next(false);
        this.dialogRef.close(true);
      } catch (error: any) {
        this.loading.next(false);
        this.toastr.error(error?.error?.message);
      }
    } else {
      // Display error message
      this.toastr.error('Cost of voucher is required');
    }
  }
}
