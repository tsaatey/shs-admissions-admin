export class School {
    id: string;
    name: string;
    address: string;
    email: string;
    isPublished: boolean;
    location: string;
    nickName: string;
    logoUrl: string;
    phoneNumber: string;
    schoolCode: string;

    constructor(payload?: School) {
        this.id = payload?.id || '';
        this.name = payload?.name || '';
        this.address = payload?.address || '';
        this.email = payload?.email || '';
        this.isPublished = payload?.isPublished || false;
        this.location = payload?.location || '';
        this.nickName = payload?.nickName || '';
        this.logoUrl = payload?.logoUrl || '';
        this.phoneNumber = payload?.phoneNumber || '';
        this.schoolCode = payload?.schoolCode || '';
    }
}
