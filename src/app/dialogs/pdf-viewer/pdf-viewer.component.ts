import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-pdf-viewer',
  imports: [MatDialogModule, NgxDocViewerModule],
  templateUrl: './pdf-viewer.component.html',
  styleUrl: './pdf-viewer.component.scss',
})
export class PdfViewerComponent {
  public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public readonly url = inject(MAT_DIALOG_DATA);

  onCompleteLoading() {
    this.loading.next(false);
  }
}
