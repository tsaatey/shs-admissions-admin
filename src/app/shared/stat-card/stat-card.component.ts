import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-stat-card',
  imports: [MatCardModule, CommonModule],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss',
})
export class StatCardComponent {
  @Input() mainText!: string;
  @Input() subtitle!: string;
  @Input() color: string = 'black';
  @Input() backgroundColor: string = 'white';
}
