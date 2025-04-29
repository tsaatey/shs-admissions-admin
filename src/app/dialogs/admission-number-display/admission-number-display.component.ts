import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Component, inject } from '@angular/core';
import { CardModule } from '@coreui/angular';

@Component({
  selector: 'app-admission-number-display',
  imports: [MatDialogModule, CardModule, MatButtonModule],
  templateUrl: './admission-number-display.component.html',
  styleUrl: './admission-number-display.component.scss',
})
export class AdmissionNumberDisplayComponent {
  public data = inject(MAT_DIALOG_DATA);
}
