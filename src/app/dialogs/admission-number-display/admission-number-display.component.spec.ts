import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionNumberDisplayComponent } from './admission-number-display.component';

describe('AdmissionNumberDisplayComponent', () => {
  let component: AdmissionNumberDisplayComponent;
  let fixture: ComponentFixture<AdmissionNumberDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmissionNumberDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmissionNumberDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
