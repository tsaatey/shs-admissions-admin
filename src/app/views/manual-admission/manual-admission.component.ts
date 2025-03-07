import { Component } from '@angular/core';
import {
  CardComponent,
  CardBodyComponent,
  RowComponent,
  ColComponent,
  FormModule,
  ButtonDirective,
  NavModule,
  TabsModule,
  CardHeaderComponent,
} from '@coreui/angular';

@Component({
    selector: 'app-manual-admission',
    imports: [
        CardComponent,
        CardBodyComponent,
        CardHeaderComponent,
        RowComponent,
        ColComponent,
        FormModule,
        ButtonDirective,
        NavModule,
        TabsModule,
    ],
    templateUrl: './manual-admission.component.html',
    styleUrl: './manual-admission.component.scss'
})
export class ManualAdmissionComponent {}
