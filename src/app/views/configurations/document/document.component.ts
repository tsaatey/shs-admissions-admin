import { MatDialog } from '@angular/material/dialog';
import { DocumentRepository } from './../../../repositories/document.repo';
import { ToastrService } from 'ngx-toastr';
import { SessionStateStore } from './../../../store/session.store';
import { MatMenuModule } from '@angular/material/menu';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  CardComponent,
  CardBodyComponent,
  RowComponent,
  ColComponent,
  ButtonDirective,
  FormModule,
  CardHeaderComponent,
} from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { CONFIRMDIALOG } from '../../../enums/confirm-dialog.enums';
import { ConfirmationService } from '../../../services/confirm-dialog-service';
import { PdfViewerComponent } from '../../../dialogs/pdf-viewer/pdf-viewer.component';

@Component({
  selector: 'app-document',
  imports: [
    CardComponent,
    CardBodyComponent,
    CardHeaderComponent,
    RowComponent,
    ColComponent,
    ButtonDirective,
    FormModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatMenuModule,
    CommonModule,
  ],
  templateUrl: './document.component.html',
  styleUrl: './document.component.scss',
})
export class DocumentComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private store = inject(SessionStateStore);
  private toastr = inject(ToastrService);
  private docRepo = inject(DocumentRepository);
  private dialog = inject(MatDialog);

  public documentColumns: string[] = ['name', 'uploadedOn', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public dataSource = new MatTableDataSource<Document>([]);

  public form: any;
  private document!: File;
  public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  private confirmationService = inject(ConfirmationService);

  async ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      file: [null, Validators.required],
    });

    // Get documents
    await this.getDocuments(Number(this.store.sessionSchool().id));
  }

  onDocumentChosen(event: any) {
    if (event.target.files.length > 0) {
      this.document = event.target.files[0];
    }
  }

  async uploadDocumentHandler() {
    // Start loading
    this.loading.next(true);

    try {
      const formData = new FormData();

      formData.append('name', this.form.value.name ?? '');
      formData.append('description', this.form.value.description ?? '');
      formData.append('file', this.document);
      formData.append('schoolId', this.store.sessionSchool().id);

      await this.docRepo.uploadDocument(formData);

      // Stop loading
      this.loading.next(false);

      // Reset the form
      this.form.reset();

      // Display success message
      this.toastr.success('Document upload successful');

      // Get documents
      await this.getDocuments(Number(this.store.sessionSchool().id));
    } catch (error: any) {
      // Stop loading
      this.loading.next(false);

      // Display error message
      this.toastr.error(error?.error?.message);
    }
  }

  async getDocuments(schoolId: number) {
    this.dataSource.data = await this.docRepo.getAllDocuments(schoolId);
    if (this.dataSource.data.length > 0) {
      this.dataSource.paginator = this.paginator;
    }
  }

  async onDeleteDocument(id: string) {
    const confirmed = await this.confirmationService.confirmAction(
      `Delete document?`,
      'You are about to permanently delete a document',
      'Proceed!',
      CONFIRMDIALOG.CONFIRM_DELETE_COLOR
    );

    if (confirmed) {
      try {
        // Show the loader
        this.confirmationService.showLoader('Deleting document...');

        await this.docRepo.deleteDocument(
          Number(this.store.sessionSchool().id),
          id
        );

        // Hide the loader
        this.confirmationService.hideLoader();

        // Display success message
        this.toastr.success('Document deleted successfully');

        await this.getDocuments(Number(this.store.sessionSchool().id));
      } catch (error: any) {
        // Hide the loader in case of an error
        this.confirmationService.hideLoader();

        this.toastr.error(
          error?.error?.message || error?.message || 'Unknown error'
        );
      }
    }
  }

  onViewDocument(url: string) {
    this.dialog.open(PdfViewerComponent, {
      data: url,
      width: '600px',
      height: '600px',
    });
  }
}
