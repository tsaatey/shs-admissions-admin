import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  CardComponent,
  CardBodyComponent,
  InputGroupComponent,
  FormControlDirective,
  ButtonDirective,
  FormModule,
} from '@coreui/angular';

@Component({
    selector: 'app-register-p2',
    imports: [
        ContainerComponent,
        RowComponent,
        ColComponent,
        CardComponent,
        CardBodyComponent,
        InputGroupComponent,
        FormControlDirective,
        ButtonDirective,
        RouterModule,
        FormModule,
    ],
    templateUrl: './register-p2.component.html',
    styleUrl: './register-p2.component.scss'
})
export class RegisterP2Component {}
