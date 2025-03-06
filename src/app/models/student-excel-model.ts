export class StudentExcelFormat {
  jhsIndexNumber: string;
  admissionNumber: string;
  admissionYear: string;
  imageUrl: string;
  name: string;
  firstname: string;
  surname: string;
  othernames: string;
  gender: string;
  dateOfBirth: string;
  programOffered: string;
  track: string;
  residentialStatus: string;
  placeOfBirth: string;
  nationality: string;
  hometown: string;
  region: string;
  religiousDenomination: string;
  address: string;
  phoneNumber: string;
  lastSchoolAttended: string;
  addressOfLastSchoolAttended: string;
  physicalChallenge: string;
  nameOfFather: string;
  occupationOfFather: string;
  addressOfFather: string;
  phoneNumberOfFather: string;
  nameOfMother: string;
  occupationOfMother: string;
  addressOfMother: string;
  phoneNumberOfMother: string;
  nameOfGuardian: string;
  occupationOfGuardian: string;
  phoneNumberOfGuardian: string;
  altPhoneNumberOfGuardian: string;
  postalAddressOfGuardian: string;
  residentialAddressOfGuardian: string;
  admissionStatus: string;
  grade: number | string;
  score: number | string;
  enrolmentCode: number | string;
  enrolmentStatus: boolean;
  currentLevel: number | string;
  assignedHouse: string;
  dateTimeAdmitted: string;

  constructor(payload?: StudentExcelFormat) {
    this.jhsIndexNumber = payload?.jhsIndexNumber || '';
    this.admissionNumber = payload?.admissionNumber || '';
    this.admissionYear = payload?.admissionYear || '';
    this.imageUrl = payload?.imageUrl || '';
    this.name = payload?.name || '';
    this.firstname = payload?.firstname || '';
    this.surname = payload?.surname || '';
    this.othernames = payload?.othernames || '';
    this.gender = payload?.gender || '';
    this.dateOfBirth = payload?.dateOfBirth || '';
    this.programOffered = payload?.programOffered || '';
    this.track = payload?.track || '';
    this.residentialStatus = payload?.residentialStatus || '';
    this.placeOfBirth = payload?.placeOfBirth || '';
    this.nationality = payload?.nationality || '';
    this.hometown = payload?.hometown || '';
    this.region = payload?.region || '';
    this.religiousDenomination = payload?.religiousDenomination || '';
    this.address = payload?.address || '';
    this.phoneNumber = payload?.phoneNumber || '';
    this.lastSchoolAttended = payload?.lastSchoolAttended || '';
    this.addressOfLastSchoolAttended =
      payload?.addressOfLastSchoolAttended || '';
    this.physicalChallenge = payload?.physicalChallenge || '';
    this.nameOfFather = payload?.nameOfFather || '';
    this.occupationOfFather = payload?.occupationOfFather || '';
    this.addressOfFather = payload?.addressOfFather || '';
    this.phoneNumberOfFather = payload?.phoneNumberOfFather || '';
    this.nameOfMother = payload?.nameOfMother || '';
    this.occupationOfMother = payload?.occupationOfFather || '';
    this.addressOfMother = payload?.addressOfMother || '';
    this.phoneNumberOfMother = payload?.phoneNumberOfMother || '';
    this.nameOfGuardian = payload?.nameOfGuardian || '';
    this.occupationOfGuardian = payload?.occupationOfGuardian || '';
    this.phoneNumberOfGuardian = payload?.phoneNumberOfGuardian || '';
    this.altPhoneNumberOfGuardian = payload?.altPhoneNumberOfGuardian || '';
    this.postalAddressOfGuardian = payload?.postalAddressOfGuardian || '';
    this.residentialAddressOfGuardian =
      payload?.residentialAddressOfGuardian || '';
    this.admissionStatus = payload?.admissionStatus || '';
    this.grade = payload?.grade || '';
    this.score = payload?.score || '';
    this.enrolmentCode = payload?.enrolmentCode || '';
    this.enrolmentStatus = payload?.enrolmentStatus || false;
    this.currentLevel = payload?.currentLevel || '';
    this.assignedHouse = payload?.assignedHouse || '';
    this.dateTimeAdmitted = payload?.dateTimeAdmitted || '';
  }
}

export class CSSPSStudent {
  jhsIndexNumber: string;
  name: string;
  gender: string;
  grade: number;
  programOffered: string;
  track: string;
  residentialStatus: string;

  constructor(payload?: CSSPSStudent) {
    this.jhsIndexNumber = payload?.jhsIndexNumber || '';
    this.name = payload?.name || '';
    this.gender = payload?.gender || '';
    this.grade = payload?.grade || ('' as any);
    this.programOffered = payload?.programOffered || '';
    this.track = payload?.track || '';
    this.residentialStatus = payload?.residentialStatus || '';
  }
}
