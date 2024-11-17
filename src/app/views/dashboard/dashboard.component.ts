import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import {
  CardBodyComponent,
  CardComponent,
  ColComponent,
  RowComponent,
} from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';

import { WidgetsDropdownComponent } from '../widgets/widgets-dropdown/widgets-dropdown.component';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  standalone: true,
  imports: [
    WidgetsDropdownComponent,
    CardComponent,
    CardBodyComponent,
    RowComponent,
    ColComponent,
    ChartjsComponent,
  ],
})
export class DashboardComponent implements OnInit {
  public academicYear = '2024/2025';

  chartPolarAreaData: ChartData = {
    labels: ['Students Enrolled', 'Students Not Enrolled', 'Students Admitted'],
    datasets: [
      {
        data: [16, 7, 14],
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
      },
    ],
  };

  options = {
    maintainAspectRatio: false,
  };

  chartBarData: ChartData = {
    labels: ['Current balance', 'Withdrawals'],
    datasets: [
      {
        label: 'Your cash at hand',
        backgroundColor: ['#36A2EB', '#FF6384'],
        data: [1623, 456],
      },
    ],
  };

  ngOnInit(): void {}
}
