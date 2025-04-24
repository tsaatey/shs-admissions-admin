import { MatMenuModule } from '@angular/material/menu';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PlaceholderInfoComponent } from './../../../dialogs/placeholder-info/placeholder-info.component';
import { Component, inject, OnInit, Renderer2 } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import {
  RowComponent,
  ColComponent,
  ButtonDirective,
  CardComponent,
  CardBodyComponent,
  NavModule,
  TabsModule,
  FormModule,
  CardHeaderComponent,
  TableModule,
  UtilitiesModule,
} from '@coreui/angular';
import { MatListModule } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MoreInformationComponent } from '../../../dialogs/more-information/more-information.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AdmissionLetterComponent } from '../../../dialogs/admission-letter/admission-letter.component';
import { SessionStateStore } from '../../../store/session.store';
import { SchoolRepository } from '../../../repositories/school.repo';
import { AdmissionLetter } from '../../../models/admission-letter';
import { DocumentViewerComponent } from '../../../dialogs/document-viewer/document-viewer.component';
import { CsspsCredentialsComponent } from '../../../dialogs/cssps-credentials/cssps-credentials.component';
import { AdmissionNumberFormatComponent } from '../../../dialogs/admission-number-format/admission-number-format.component';
import { AdmisionManagementRepository } from '../../../repositories/admission-management.repo';
import { CostOfVoucherComponent } from '../../../dialogs/cost-of-voucher/cost-of-voucher.component';
import { GhanaCediFormatPipe } from '../../../pipes/ghana-cedi-format.pipe';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admission-config',
  imports: [
    RowComponent,
    ColComponent,
    ButtonDirective,
    CardComponent,
    CardBodyComponent,
    CardHeaderComponent,
    NavModule,
    TabsModule,
    FormModule,
    ReactiveFormsModule,
    MatListModule,
    TableModule,
    UtilitiesModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    GhanaCediFormatPipe,
    CommonModule,
  ],
  templateUrl: './admission-config.component.html',
  styleUrl: './admission-config.component.scss',
})
export class AdmissionConfigComponent implements OnInit {
  private store = inject(SessionStateStore);
  private schoolRepo = inject(SchoolRepository);
  private toastr = inject(ToastrService);
  public admissionLetter: BehaviorSubject<AdmissionLetter> =
    new BehaviorSubject<AdmissionLetter>({} as AdmissionLetter);
  private renderer = inject(Renderer2);
  private adminRepo = inject(AdmisionManagementRepository);
  private formBuilder = inject(FormBuilder);

  public checkList: any;

  private csspsCredentialsInfo: any;
  private admissionNumberFormatInfo: any;
  private costOfVoucherInfo: any;

  public admissionNumberPattern: string = '';
  public costOfVoucher!: number;
  public form: any;
  public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  htmlText!: SafeHtml;

  constructor(private dialog: MatDialog, private sanitizer: DomSanitizer) {}

  async ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
    });

    const text = `
    <p>
      Set your school's
      <strong>CSSPS login credentials</strong> as default
      authentication parameters for the placement process. Our
      system will need it for the purpose of verifying and
      retrieving students placed in your school only.
    </p>`;

    this.htmlText = this.sanitizer.bypassSecurityTrustHtml(text);

    this.csspsCredentialsInfo = {
      title: 'CSSPS Credentials',
      text: this.htmlText,
    };

    const s = `
    <p>
      Set the admission number pattern based on which admission
      numbers will be generated. Use four aesterisks to indicate
      where the serial numbers should be. For example:
      <strong>GL/****/24</strong> will be
      <strong>GL/0001/24</strong>, &nbsp;
      <strong>GL/24/****</strong> will be
      <strong>GL/24/0001</strong>, etc. You can omit the
      aesterisks if the serial number is at the end.
    </p>
    `;

    this.htmlText = this.sanitizer.bypassSecurityTrustHtml(s);

    this.admissionNumberFormatInfo = {
      title: 'Admission Number Pattern',
      text: this.htmlText,
    };

    const l = `
    <p>
      Set the amount of money students must pay as cost of
      voucher. Take note that cost of vouchers are school
      specific.
    </p>
    `;

    this.htmlText = this.sanitizer.bypassSecurityTrustHtml(l);

    this.costOfVoucherInfo = {
      title: 'Cost of Voucher',
      text: this.htmlText,
    };

    // Get amdission letter
    await this.getAdmissionLetter(this.store.sessionSchool().id);

    // Get admission number pattern
    await this.getAdmissionNumberPattern(Number(this.store.sessionSchool().id));

    // Get cost of voucher
    await this.getCostOfVoucher(Number(this.store.sessionSchool().id));

    // Get the check list
    await this.getChecklist(Number(this.store.sessionSchool().id));
  }

  onViewPlaceholders() {
    this.dialog.open(PlaceholderInfoComponent, {
      // width: '600px',
      disableClose: false,
    });
  }

  onLearnMore(config: string) {
    switch (config) {
      case 'cssps_credentials':
        this.dialog.open(MoreInformationComponent, {
          data: this.csspsCredentialsInfo,
        });
        break;
      case 'admission_number_format':
        this.dialog.open(MoreInformationComponent, {
          data: this.admissionNumberFormatInfo,
        });
        break;
      case 'cost_of_voucher':
        this.dialog.open(MoreInformationComponent, {
          data: this.costOfVoucherInfo,
        });
        break;
    }
  }

  onLaunchUploadAdmissionLetterModal() {
    const ref = this.dialog.open(AdmissionLetterComponent, {
      disableClose: true,
      width: '400px',
      height: '400px',
      data: this.store.sessionSchool().id,
    });

    ref.afterClosed().subscribe(async (result) => {
      if (result) {
        // Display success message
        this.toastr.success('Admission letter uploaded successfully');

        // Get amdission letter
        await this.getAdmissionLetter(this.store.sessionSchool().id);
      }
    });
  }

  async getAdmissionLetter(schoolId: string) {
    const data = await this.schoolRepo.getAdmissionLetter(schoolId, '');
    this.admissionLetter.next(data);
  }

  async onDownloadAdmissionLetter() {
    const link = this.renderer.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', this.admissionLetter.value.url);
    link.setAttribute('download', this.admissionLetter.value.objectKey);
    link.click();
    link.remove();
  }

  onLaunchAdmissionLetterViewer(url: string) {
    this.dialog.open(DocumentViewerComponent, {
      data: url,
      width: '600px',
      height: '600px',
    });
  }

  onLaunchCSSPSCrdentialsModal() {
    const ref = this.dialog.open(CsspsCredentialsComponent, {
      disableClose: true,
      width: '400px',
      height: '400px',
      data: this.store.sessionSchool().id,
    });

    ref.afterClosed().subscribe((result) => {
      if (result) {
        // Display success message
        this.toastr.success('CSSPS Credentials set successfully');
      }
    });
  }

  onLaunchSetAdmissionNumberPrefixDialog() {
    const ref = this.dialog.open(AdmissionNumberFormatComponent, {
      disableClose: true,
      width: '400px',
      height: '400px',
      data: this.store.sessionSchool().id,
    });

    ref.afterClosed().subscribe(async (result) => {
      if (result) {
        // Display success message
        this.toastr.success('Admission number pattern set successfully!');

        // Get admission number pattern
        this.getAdmissionNumberPattern(Number(this.store.sessionSchool().id));
      }
    });
  }

  async getAdmissionNumberPattern(schoolId: number) {
    const data = await this.adminRepo.getAdmissionNumberPrefix(schoolId);
    this.admissionNumberPattern = data.admissionNumberPrefix;
  }

  onLaunchSetCostOfVoucherDialog() {
    const ref = this.dialog.open(CostOfVoucherComponent, {
      disableClose: true,
      width: '400px',
      height: '400px',
      data: this.store.sessionSchool().id,
    });

    ref.afterClosed().subscribe(async (result) => {
      if (result) {
        // Display success message
        this.toastr.success('Cost of voucher set successfully!');

        // Get admission number pattern
        this.getCostOfVoucher(Number(this.store.sessionSchool().id));
      }
    });
  }

  async getCostOfVoucher(schoolId: number) {
    const data = await this.adminRepo.getCostOfVoucher(schoolId);
    this.costOfVoucher = Number(data.costOfVoucher);
  }

  async getChecklist(schoolId: number) {
    this.checkList = await this.schoolRepo.getParticulars(schoolId);
  }

  async onAddCheckItem() {
    // Start loading
    this.loading.next(true);

    try {
      await this.schoolRepo.addParticulars(
        this.form.value.name,
        this.store.sessionSchool().id
      );

      // Stop loading
      this.loading.next(false);

      // Display success message
      this.toastr.success('Success');

      // Reset the form
      this.form.reset();

      // Get check list
      await this.getChecklist(Number(this.store.sessionSchool().id));
    } catch (error: any) {
      // Stop loading
      this.loading.next(false);

      this.toastr.error(error?.error?.message);
    }
  }
}
