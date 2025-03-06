import { PlaceholderInfoComponent } from './../../../dialogs/placeholder-info/placeholder-info.component';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
} from '@coreui/angular';
import { MatListModule } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admission-config',
  standalone: true,
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
  ],
  templateUrl: './admission-config.component.html',
  styleUrl: './admission-config.component.scss',
})
export class AdmissionConfigComponent {
  public checkList = [
    {
      name: 'Admission letter',
    },
    {
      name: 'Personal records form',
    },
    {
      name: 'Medical form',
    },
  ];

  constructor(private dialog: MatDialog) {}

  onViewPlaceholders() {
    this.dialog.open(PlaceholderInfoComponent, {
      width: '600px',
      disableClose: false,
    });
  }
}
