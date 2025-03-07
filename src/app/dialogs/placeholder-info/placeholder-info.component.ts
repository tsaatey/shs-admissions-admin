import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { RowComponent, ColComponent } from '@coreui/angular';

@Component({
    selector: 'app-placeholder-info',
    imports: [MatDialogModule, RowComponent, ColComponent],
    templateUrl: './placeholder-info.component.html',
    styleUrl: './placeholder-info.component.scss'
})
export class PlaceholderInfoComponent {}
