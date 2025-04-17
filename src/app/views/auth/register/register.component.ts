import { AuthStore } from './../../../store/authentication.store';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  CardComponent,
  CardBodyComponent,
  InputGroupComponent,
  FormControlDirective,
  ButtonDirective,
} from '@coreui/angular';
import { Router, RouterModule } from '@angular/router';
import { SchoolSignupDto } from '../../../interfaces/sign-up.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    CommonModule,
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardComponent,
    CardBodyComponent,
    InputGroupComponent,
    FormControlDirective,
    ButtonDirective,
    RouterModule,
    ReactiveFormsModule,
  ],
})
export class RegisterComponent implements OnInit, AfterViewInit {
  public form: any;
  private store = inject(AuthStore);

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      schoolName: ['', Validators.required],
      schoolCode: ['', Validators.required],
      schoolAddress: ['', Validators.required],
      schoolLocation: ['', Validators.required],
    });
  }

  ngAfterViewInit(): void {
    this.form.patchValue({ ...this.store.schoolData() });
  }

  onContinue() {
    this.store.setSchoolData(this.form.value as SchoolSignupDto);
    this.router.navigate(['sign-up-continued']);
  }
}
