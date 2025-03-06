export class AdmissionLetter {
  id: string;
  objectKey: string;
  url: string;
  year: string;

  constructor(payload?: AdmissionLetter) {
    this.id = payload?.id || '';
    this.objectKey = payload?.objectKey || '';
    this.url = payload?.url || '';
    this.year = payload?.year || ''
  }
}