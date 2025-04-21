import { AuthenticationBloc } from './../../blocs/auth.bloc';
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
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AuthStore } from '../../store/authentication.store';

@Component({
  selector: 'app-cssps-credentials',
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
  templateUrl: './cssps-credentials.component.html',
  styleUrl: './cssps-credentials.component.scss',
})
export class CsspsCredentialsComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<CsspsCredentialsComponent>);
  private schoolId = inject(MAT_DIALOG_DATA);
  private formBuilder = inject(FormBuilder);
  public form: any;
  private toastr = inject(ToastrService);
  private authBloc = inject(AuthenticationBloc);
  private store = inject(AuthStore);

  public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      schoolCode: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  async onSetCSSPSCredentials() {
    if (this.form.valid) {
      // Start loading
      this.loading.next(true);
      try {
        // Get for values
        const schoolCode = this.form.value.schoolCode;
        const password = this.form.value.password;

        // Contact server
        await this.authBloc.setCSSPSCredentials(
          this.store.jwt(),
          Number(this.schoolId),
          schoolCode,
          password
        );

        // Stop loading
        this.loading.next(false);

        // Reset form
        this.form.reset();

        // Close dialog
        this.dialogRef.close(true);
      } catch (error: any) {
        // Stop loading
        this.loading.next(false);

        // Display error message
        this.toastr.error(error?.error?.message || 'Unknown error occurred');
      }
    } else {
      this.toastr.error('Scool code and password are required!');
    }
  }
}
