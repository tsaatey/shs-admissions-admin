import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentDataChartComponent } from './enrollment-data-chart.component';

describe('EnrollmentDataChartComponent', () => {
  let component: EnrollmentDataChartComponent;
  let fixture: ComponentFixture<EnrollmentDataChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrollmentDataChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrollmentDataChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
