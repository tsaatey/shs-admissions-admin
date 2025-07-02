import { HouseRepo } from './../../repositories/house.repo';
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
  FormModule,
  CardComponent,
  CardBodyComponent,
} from '@coreui/angular';
import { BehaviorSubject } from 'rxjs';
import { HouseDto } from '../../interfaces/dtos.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-house',
  imports: [
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    RowComponent,
    ColComponent,
    CommonModule,
    FormModule,
    CardComponent,
    CardBodyComponent,
  ],
  templateUrl: './create-house.component.html',
  styleUrl: './create-house.component.scss',
})
export class CreateHouseComponent implements OnInit {
  public houseForm: any;
  public loading = new BehaviorSubject<boolean>(false);
  private schoolId = inject(MAT_DIALOG_DATA);
  private toastr = inject(ToastrService);

  constructor(
    private dialogRef: MatDialogRef<CreateHouseComponent>,
    private formBuilder: FormBuilder,
    private houseRepo: HouseRepo
  ) {}

  ngOnInit(): void {
    // Create house form
    this.houseForm = this.formBuilder.group({
      houseName: ['', Validators.required],
      houseNumber: ['', Validators.required],
      houseMaster: ['', Validators.nullValidator],
      houseMistress: ['', Validators.nullValidator],
      assistantHouseMaster: ['', Validators.nullValidator],
      assistantHouseMistress: ['', Validators.nullValidator],
      sex: ['', Validators.required],
    });
  }

  async onCreateHouse() {
    // Start loading
    this.loading.next(true);

    try {
      // Contact server
      await this.houseRepo.addHouse(
        this.schoolId,
        this.houseForm.value as HouseDto
      );

      // Stop loading
      this.loading.next(false);

      // Close dialog and pass success
      this.dialogRef.close(true);
    } catch (error: any) {
      // Stop loading
      this.loading.next(false);

      this.toastr.error(
        error?.error?.message || error?.message || 'Unknown error'
      );
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
