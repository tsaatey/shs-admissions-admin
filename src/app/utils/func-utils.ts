import { UserDto } from './../interfaces/user.dto';
import { SchoolUserDto } from './../interfaces/school-user.dto';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Student } from './../models/student.model';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user.model';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { PhoneNumberUtil } from 'google-libphonenumber';

const phoneUtil = PhoneNumberUtil.getInstance();

export function getFormattedStudentForExcel(element: Student) {
  return {
    jhsIndexNumber: element.jhsIndexNumber,
    admissionNumber: element.admissionNumber,
    admissionYear: element.admissionYear,
    imageUrl: element.imageUrl,
    name: element.name,
    firstname: element.firstname,
    surname: element.surname,
    othernames: element.othernames,
    gender: element.gender,
    dateOfBirth: element.dateOfBirth,
    programOffered: element.programOffered,
    track: element.track,
    residentialStatus: element.residentialStatus,
    placeOfBirth: element.placeOfBirth,
    nationality: element.nationality,
    hometown: element.hometown,
    region: element.region,
    religiousDenomination: element.religiousDenomination,
    address: element.address,
    phoneNumber: element.phoneNumber,
    lastSchoolAttended: element.lastSchoolAttended,
    addressOfLastSchoolAttended: element.addressOfLastSchoolAttended,
    physicalChallenge: element.physicalChallenge,
    nameOfFather: element.nameOfFather,
    occupationOfFather: element.occupationOfFather,
    addressOfFather: element.addressOfFather,
    phoneNumberOfFather: element.phoneNumberOfFather,
    nameOfMother: element.nameOfMother,
    occupationOfMother: element.occupationOfMother,
    addressOfMother: element.addressOfMother,
    phoneNumberOfMother: element.phoneNumberOfMother,
    nameOfGuardian: element.nameOfGuardian,
    occupationOfGuardian: element.occupationOfGuardian,
    phoneNumberOfGuardian: element.phoneNumberOfGuardian,
    altPhoneNumberOfGuardian: element.altPhoneNumberOfGuardian,
    postalAddressOfGuardian: element.postalAddressOfGuardian,
    residentialAddressOfGuardian: element.residentialAddressOfGuardian,
    admissionStatus: element.admissionStatus,
    grade: element.grade,
    score: element.score,
    enrolmentCode: element.enrolmentCode,
    enrolmentStatus: element.enrolmentStatus,
    currentLevel: element.currentLevel,
    assignedHouse: element.houseAllocated?.houseName,
    dateTimeAdmitted: element.dateTimeAdmitted,
  };
}

export function getUserFromIdToken(idToken: string) {
  const jwtHelper = new JwtHelperService();

  // Decode the Id token
  const decodedToken = jwtHelper.decodeToken(idToken);

  // School
  const school = {
    schoolId: decodedToken['custom:schoolId'],
    schoolName: decodedToken['custom:schName'],
    schoolCode: decodedToken['custom:schCode'],
    schoolAddress: decodedToken['custom:schoolAddress'],
    schoolLocation: decodedToken['custom:schLocation'],
    email: decodedToken['email'],
    emailVerified: decodedToken['email_verified'],
    phoneNumber: decodedToken['phone_number'],
    phoneNumberVerified: decodedToken['phone_number_verified'],
  };

  // User
  const user = {
    userId: decodedToken['sub'],
    firstName: decodedToken['given_name'],
    lastName: decodedToken['family_name'],
    middleName: decodedToken['middle_name'],
    gender: decodedToken['gender'],
    email: decodedToken['email'],
    phoneNumber: decodedToken['phone_number'],
    school: school as SchoolUserDto,
  };

  return new User(user as UserDto);
}

export function getErrorMessage(error: HttpErrorResponse) {
  let errorMessage = 'An unknown error occurred';
  if (error.error && error.error.message) {
    errorMessage = error.error.message;
  } else if (error.message) {
    errorMessage = error.message;
  } else if (error.status) {
    errorMessage = `Server returned status code ${error.status}`;
  }

  // if (error.status === 403) {
  //   errorMessage = 'You are not authorised to perform this action.';
  // } else {

  // }

  return errorMessage;
}

export function getRolesFromAccessToken(accesstoken: string): string[] {
  const jwtHelper = new JwtHelperService();

  // Decode the Id token
  const decodedToken = jwtHelper.decodeToken(accesstoken);

  return decodedToken['cognito:groups'];
}

/**
 * Validates a Ghana phone number and:
 * - Displays it in readable international format with spaces (e.g., +233 20 537 1240)
 * - Stores it internally in raw value as +233205371240 (no spaces)
 */
export function ghanaPhoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const rawValue = control.value;

    if (!rawValue) return null; // handled by required validator

    try {
      const number = phoneUtil.parse(rawValue, 'GH');
      const isValid = phoneUtil.isValidNumberForRegion(number, 'GH');

      if (!isValid) return { invalidPhoneNumber: true };

      // If valid, format and replace value with international format
      let formatted = phoneUtil.format(number, 1); // 1 = INTERNATIONAL
      // // Remove spaces
      // formatted = formatted.replace(/\s+/g, '');
      const digitsOnly = formatted.replace(/\D/g, ''); // e.g. +233249640111 → 233249640111
      control.setValue(formatted, { emitEvent: false }); // update without re-triggering validator

      return null;
    } catch (err) {
      return { invalidPhoneNumber: true };
    }
  };
}
