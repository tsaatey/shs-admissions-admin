import { Component } from '@angular/core';
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
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
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
    ]
})
export class RegisterComponent {
  constructor() {}
}
