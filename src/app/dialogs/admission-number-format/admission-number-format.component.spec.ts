import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionNumberFormatComponent } from './admission-number-format.component';

describe('AdmissionNumberFormatComponent', () => {
  let component: AdmissionNumberFormatComponent;
  let fixture: ComponentFixture<AdmissionNumberFormatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmissionNumberFormatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmissionNumberFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
