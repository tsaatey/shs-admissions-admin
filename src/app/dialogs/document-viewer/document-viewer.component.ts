import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-document-viewer',
  imports: [MatDialogModule],
  templateUrl: './document-viewer.component.html',
  styleUrl: './document-viewer.component.scss',
})
export class DocumentViewerComponent {
  public sanitizer = inject(DomSanitizer);
  public fileUrl = inject(MAT_DIALOG_DATA);
}
