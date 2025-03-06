export class AdmissionNumberResponse {
    admissionNumber: string;
    houseAllocated: string;
    jhsIndexNumber: string;

    constructor(payload?: AdmissionNumberResponse) {
        this.admissionNumber = payload?.admissionNumber || '';
        this.houseAllocated = payload?.houseAllocated || '';
        this.jhsIndexNumber = payload?.jhsIndexNumber || '';
    }
}