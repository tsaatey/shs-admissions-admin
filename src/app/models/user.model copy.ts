export class User {
    schoolId: string;
    schoolName: string;
    schoolCode: string;
    schoolLocation: string;
    schoolAddress: string;
    email: string;
    emailVerified: boolean;
    firtsName: string;
    lastName: string;
    middleName: string;
    gender: string;
    phoneNumber: string;
    phoneNumberVerified: boolean;

    constructor(payload?: User) {
        this.schoolId = payload?.schoolId || '';
        this.schoolName = payload?.schoolName || '';
        this.schoolCode = payload?.schoolCode || '';
        this.schoolAddress = payload?.schoolAddress || '';
        this.schoolLocation = payload?.schoolLocation || '';
        this.email = payload?.email || '';
        this.emailVerified = payload?.emailVerified || false;
        this.firtsName = payload?.firtsName || '';
        this.lastName = payload?.lastName || '';
        this.middleName = payload?.middleName || '';
        this.gender = payload?.gender || '';
        this.phoneNumber = payload?.phoneNumber || '';
        this.phoneNumberVerified = payload?.phoneNumberVerified || false;
    }
}
