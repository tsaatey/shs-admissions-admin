import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

@Component({
  selector: 'app-pdf-viewer',
  imports: [MatDialogModule, NgxDocViewerModule],
  templateUrl: './pdf-viewer.component.html',
  styleUrl: './pdf-viewer.component.scss',
})
export class PdfViewerComponent {
  public readonly url = inject(MAT_DIALOG_DATA);
}
