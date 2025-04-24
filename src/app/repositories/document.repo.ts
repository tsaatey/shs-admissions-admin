import { inject, Injectable } from '@angular/core';
import { DocumentManagementService } from '../services/document-management.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Document as CustomDocument } from '../models/document.model';

@Injectable({ providedIn: 'root' })
export class DocumentRepository {
  private docService = inject(DocumentManagementService);

  public uploadDocument(document: FormData): Promise<any> {
    return new Promise((resolve, reject) => {
      this.docService.uploadDocument(document).subscribe({
        next: (response: any) => {
          resolve(response);
        },
        error: (error: HttpErrorResponse) => {
          reject(error);
        },
      });
    });
  }

  public getAllDocuments(schoolId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.docService.getAllDocuments(schoolId).subscribe({
        next: (response: any) => {
          resolve(
            response.map(
              (doc: any) =>
                new CustomDocument({
                  id: doc.id,
                  name: doc.name,
                  description: doc.description,
                  createdAt: doc.createdAt,
                  objectKey: doc.objectKey,
                  url: doc.url,
                })
            )
          );
        },
        error: (error: HttpErrorResponse) => {
          reject(error);
        },
      });
    });
  }

  public deleteDocument(schoolId: number, documentId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.docService.deleteDocument(schoolId, documentId).subscribe({
        next: (response: any) => {
          resolve(response);
        },
        error: (error: HttpErrorResponse) => {
          reject(error);
        },
      });
    });
  }
}
