import { Component, Input, OnInit } from '@angular/core';
// import * as pdfjsLib from 'pdfjs-dist/build';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

@Component({
  selector: 'app-pdf-renderer',
  imports: [],
  templateUrl: './pdf-renderer.component.html',
  styleUrl: './pdf-renderer.component.scss',
})
export class PdfRendererComponent implements OnInit {
  @Input() pdfSrc!: string;

  ngOnInit(): void {
    this.loadPdf();
  }

  loadPdf() {
    const loadingTask = getDocument(this.pdfSrc);
    loadingTask.promise.then((pdf: any) => {
      // Fetch the first page
      pdf.getPage(1).then((page: any) => {
        const scale = 1.5;
        const viewport = page.getViewport({ scale });
        const canvas = document.getElementById(
          'pdfRenderer'
        ) as HTMLCanvasElement;
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        page.render(renderContext);
      });
    });
  }
}
