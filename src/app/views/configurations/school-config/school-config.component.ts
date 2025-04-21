import { HouseRepo } from './../../../repositories/house.repo';
import { ToastrService } from 'ngx-toastr';
import { SchoolRepository } from './../../../repositories/school.repo';
import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
  viewChild,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AvatarComponent,
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  FormModule,
  NavModule,
  RowComponent,
  TabsModule,
} from '@coreui/angular';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { SessionStateStore } from '../../../store/session.store';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ImageViewerComponent } from '../../../dialogs/image-viewer/image-viewer.component';
import { ConfirmationService } from '../../../services/confirm-dialog-service';
import { CONFIRMDIALOG } from '../../../enums/confirm-dialog.enums';
import { House } from '../../../models/house.model';
import { CreateHouseComponent } from '../../../dialogs/create-house/create-house.component';
import { UpdateHouseComponent } from '../../../dialogs/update-house/update-house.component';

@Component({
  selector: 'app-school-config',
  imports: [
    FormModule,
    ReactiveFormsModule,
    RowComponent,
    ColComponent,
    ButtonDirective,
    CardComponent,
    CardBodyComponent,
    CardHeaderComponent,
    NavModule,
    TabsModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatPaginatorModule,
    CommonModule,
  ],
  templateUrl: './school-config.component.html',
  styleUrl: './school-config.component.scss',
})
export class SchoolConfigComponent implements OnInit, AfterViewInit {
  public photoColumns: string[] = ['name', 'preview', 'action'];
  public houseColumns: string[] = [
    'houseName',
    'houseMaster',
    'assistantHouseMaster',
    'houseMistress',
    'assistantHouseMistress',
    'sex',
    'action',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('housePaginator') housePaginator!: MatPaginator;

  public dataSource = new MatTableDataSource<any>([]);

  public houseDataSource = new MatTableDataSource<House>([]);

  readonly sessionStore = inject(SessionStateStore);

  // Logo form
  public logoForm: any;

  // Nickname form
  public schoolUpdateForm: any;

  // Photo form
  public photoForm: any;

  public toggleEdit = new BehaviorSubject<boolean>(false);
  public loading = new BehaviorSubject<boolean>(false);
  public uploadingLogo = new BehaviorSubject<boolean>(false);
  public uploadingSchoolImage = new BehaviorSubject<boolean>(false);

  logo!: File;
  image!: File;
  images: any;
  houses!: House[];

  private confirmationService = inject(ConfirmationService);

  constructor(
    private formBuilder: FormBuilder,
    private schoolRepo: SchoolRepository,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private houseRepo: HouseRepo
  ) {}

  ngOnInit(): void {
    // Create the logo form
    this.logoForm = this.formBuilder.group({
      file: [null, Validators.required],
    });

    // Create nickname form
    this.schoolUpdateForm = this.formBuilder.group({
      name: new FormControl(
        { value: '', disabled: true },
        Validators.nullValidator
      ),
      nickname: new FormControl(
        { value: '', disabled: true },
        Validators.nullValidator
      ),
    });

    // Create photo form
    this.photoForm = this.formBuilder.group({
      image: [null, Validators.required],
    });
  }

  async ngAfterViewInit() {
    const data = {
      name: this.sessionStore.sessionSchool().name,
      nickname: this.sessionStore.sessionSchool().nickName,
    };
    this.schoolUpdateForm.patchValue(data);

    // Get school images
    await this.getSchoolImages(this.sessionStore.sessionSchool().id);

    // Get houses
    await this.getHouses(this.sessionStore.sessionSchool().id);
  }

  async updateSchoolHandler() {
    // Start loading
    this.loading.next(true);

    try {
      const name = this.schoolUpdateForm.value.name ?? '';
      const nickName = this.schoolUpdateForm.value.nickname ?? '';

      if (name && nickName) {
        await this.schoolRepo.updateSchool(
          this.sessionStore.sessionSchool().id,
          name,
          nickName
        );

        // Stop loading
        this.loading.next(false);

        // Display success message
        this.toastr.success('Update successful');

        // Fetch updated school information
        await this.schoolRepo.getSchoolInfo(
          this.sessionStore.sessionSchool().id
        );

        this.toggleEdit.next(false);
      } else {
        this.toastr.error('Both school name and nickname are required');
      }
    } catch (error: any) {
      console.log('Some unknown error');
      // Stop loading
      this.loading.next(false);

      // Display error message
      this.toastr.error(error?.error?.message);
    }
  }

  onToggleEdit() {
    this.toggleEdit.next(true);
    this.schoolUpdateForm.get('name')?.enable();
    this.schoolUpdateForm.get('nickname')?.enable();
  }

  onCancelEdit() {
    this.toggleEdit.next(false);
    this.schoolUpdateForm.get('name')?.disable();
    this.schoolUpdateForm.get('nickname')?.disable();
  }

  onschoolLogoChosen(event: any) {
    if (event.target.files.length > 0) {
      this.logo = event.target.files[0];
    }
  }

  async uploadLogo() {
    // Start loading
    this.uploadingLogo.next(true);

    try {
      const formData = new FormData();
      formData.append('image', this.logo);
      formData.append('schoolId', this.sessionStore.sessionSchool().id);

      await this.schoolRepo.uploadLogo(formData);

      // Display success message
      this.toastr.success('Logo uploaded successfully.');

      // Stop loading
      this.uploadingLogo.next(false);

      // Reset form
      this.logoForm.reset();

      // Fetch updated school information
      await this.schoolRepo.getSchoolInfo(this.sessionStore.sessionSchool().id);
    } catch (error: any) {
      // Stop loading
      this.uploadingLogo.next(false);

      // Display error
      this.toastr.error(error?.error.message);
    }
  }

  onschoolImageChosen(event: any) {
    if (event.target.files.length > 0) {
      this.image = event.target.files[0];
    }
  }

  async uploadSchoolImage() {
    // Start loading
    this.uploadingSchoolImage.next(true);

    try {
      const formData = new FormData();
      formData.append('image', this.image);
      formData.append('schoolId', this.sessionStore.sessionSchool().id);

      await this.schoolRepo.uploadImage(formData);

      // Display success message
      this.toastr.success('Image uploaded successfully.');

      // Stop loading
      this.uploadingSchoolImage.next(false);

      // Reset form
      this.photoForm.reset();

      // Fetch updated school information
      await this.getSchoolImages(this.sessionStore.sessionSchool().id);
    } catch (error: any) {
      // Stop loading
      this.uploadingSchoolImage.next(false);

      // Display error
      this.toastr.error(error?.error.message);
    }
  }

  async getSchoolImages(schoolId: string) {
    try {
      const data = await this.schoolRepo.getUploadedImages(schoolId);
      this.images = data.map((image: any) => {
        return {
          url: image?.imageUrl,
          name: image?.imageUrl.split('/')[3],
          id: image?.id,
        };
      });
      this.dataSource.data = this.images;
      if (this.dataSource.data) {
        this.dataSource.paginator = this.paginator;
      }

      console.log(data);
    } catch (error: any) {
      // console.log('Some error');
      // this.toastr.error(error?.error?.message);
    }
  }

  onImageView(url: string) {
    this.dialog.open(ImageViewerComponent, {
      // width: '600px',
      disableClose: false,
      data: url,
      // height: '600px',
    });
  }

  async onDeleteImage(imageId: string) {
    const confirmed = await this.confirmationService.confirmAction(
      `Delete image?`,
      'You are about to permanently delete an image',
      'Proceed!',
      CONFIRMDIALOG.CONFIRM_DELETE_COLOR
    );

    if (confirmed) {
      try {
        // Show the loader
        this.confirmationService.showLoader('Deleting image...');

        await this.schoolRepo.deleteSchoolPhoto(
          this.sessionStore.sessionSchool().id,
          imageId
        );

        // Hide the loader
        this.confirmationService.hideLoader();

        // Display success message
        this.toastr.success('Image deleted successfully');

        await this.getSchoolImages(this.sessionStore.sessionSchool().id);
      } catch (error: any) {
        // Hide the loader in case of an error
        this.confirmationService.hideLoader();

        this.toastr.error(error?.error?.message);
      }
    }
  }

  onLaunchCreateHouseModal() {
    // Open dialog
    const dialogRef = this.dialog.open(CreateHouseComponent, {
      width: '650px',
      disableClose: true,
      data: this.sessionStore.sessionSchool().id,
    });

    // Listen to success close event
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        // Display success
        this.toastr.success('House created successfully');

        // Reload houses
        await this.getHouses(this.sessionStore.sessionSchool().id);
      }
    });
  }

  async getHouses(schoolId: string) {
    this.houses = await this.houseRepo.getHouses(schoolId);

    this.houseDataSource.data = this.houses;
    if (this.houses.length > 0) {
      this.houseDataSource.paginator = this.housePaginator;
    }
  }

  onLaunchUpdateHouseModal(house: House) {
    // Open dialog
    const dialogRef = this.dialog.open(UpdateHouseComponent, {
      width: '650px',
      disableClose: true,
      data: house,
    });

    // Listen to success close event
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        // Display success
        this.toastr.success('House updated successfully');

        // Reload houses
        await this.getHouses(this.sessionStore.sessionSchool().id);
      }
    });
  }

  async onDeleteHouse(id: number) {
    const confirmed = await this.confirmationService.confirmAction(
      `Delete house?`,
      'You are about to permanently delete a house',
      'Proceed!',
      CONFIRMDIALOG.CONFIRM_DELETE_COLOR
    );

    if (confirmed) {
      try {
        // Show the loader
        this.confirmationService.showLoader('Deleting house...');

        await this.houseRepo.deleteHouse(id);

        // Hide the loader
        this.confirmationService.hideLoader();

        // Display success message
        this.toastr.success('House deleted successfully');

        await this.getHouses(this.sessionStore.sessionSchool().id);
      } catch (error: any) {
        // Hide the loader in case of an error
        this.confirmationService.hideLoader();

        this.toastr.error(error?.error?.message);
      }
    }
  }
}
