import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-more-information',
  imports: [MatDialogModule],
  templateUrl: './more-information.component.html',
  styleUrl: './more-information.component.scss',
})
export class MoreInformationComponent {
  public info = inject(MAT_DIALOG_DATA);
}
