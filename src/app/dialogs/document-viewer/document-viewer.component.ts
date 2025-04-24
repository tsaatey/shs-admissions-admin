import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

@Component({
  selector: 'app-document-viewer',
  imports: [MatDialogModule, NgxDocViewerModule],
  templateUrl: './document-viewer.component.html',
  styleUrl: './document-viewer.component.scss',
})
export class DocumentViewerComponent {
  public fileUrl = inject(MAT_DIALOG_DATA);
}
