export class Document {
  id: string;
  name: string;
  description: string;
  url: string;
  objectKey: string;
  createdAt: string;

  constructor(document?: Document) {
    this.id = document?.id || '';
    this.name = document?.name || '';
    this.description = document?.description || '';
    this.url = document?.url || '';
    this.objectKey = document?.objectKey || '';
    this.createdAt = document?.createdAt || '';
  }
}
