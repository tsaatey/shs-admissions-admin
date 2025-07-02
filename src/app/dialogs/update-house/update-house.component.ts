import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
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
  FormModule,
  CardComponent,
  CardBodyComponent,
} from '@coreui/angular';
import { BehaviorSubject } from 'rxjs';
import { HouseRepo } from '../../repositories/house.repo';
import { SessionStateStore } from '../../store/session.store';
import { House } from '../../models/house.model';

@Component({
  selector: 'app-update-house',
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
  templateUrl: './update-house.component.html',
  styleUrl: './update-house.component.scss',
})
export class UpdateHouseComponent
  implements OnInit, AfterViewInit, AfterViewChecked
{
  public house: House = inject(MAT_DIALOG_DATA);
  private cdf = inject(ChangeDetectorRef);

  public houseForm: any;
  public loading = new BehaviorSubject<boolean>(false);

  private store = inject(SessionStateStore);

  constructor(
    private dialogRef: MatDialogRef<UpdateHouseComponent>,
    private formBuilder: FormBuilder,
    private houseRepo: HouseRepo,
    private toastr: ToastrService
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
  ngAfterViewInit(): void {
    this.houseForm.patchValue(this.house);
  }

  ngAfterViewChecked(): void {
    this.cdf.detectChanges();
  }

  async onUpdateHouse() {
    // Start loading
    this.loading.next(true);

    try {
      if (this.houseForm.value.houseName) {
        this.house.houseName = this.houseForm.value.houseName;
      }
      if (this.houseForm.value.houseNumber) {
        this.house.houseNumber = this.houseForm.value.houseNumber;
      }
      if (this.houseForm.value.houseMaster) {
        this.house.houseMaster = this.houseForm.value.houseMaster;
      }
      if (this.houseForm.value.assistantHouseMaster) {
        this.house.assistantHouseMaster =
          this.houseForm.value.assistantHouseMaster;
      }
      if (this.houseForm.value.houseMistress) {
        this.house.houseMistress = this.houseForm.value.houseMistress;
      }
      if (this.houseForm.value.assistantHouseMistress) {
        this.house.assistantHouseMistress =
          this.houseForm.value.assistantHouseMistress;
      }
      if (this.houseForm.value.sex) {
        this.house.sex = this.houseForm.value.sex;
      }

      // Contact server
      await this.houseRepo.updateHouse(
        this.store.sessionSchool().id,
        this.house
      );

      // Stop loading
      this.loading.next(false);

      // Close dialog and pass success
      this.dialogRef.close(true);
    } catch (error: any) {
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
