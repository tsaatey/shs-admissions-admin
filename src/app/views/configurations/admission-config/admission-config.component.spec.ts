import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionConfigComponent } from './admission-config.component';

describe('AdmissionConfigComponent', () => {
  let component: AdmissionConfigComponent;
  let fixture: ComponentFixture<AdmissionConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmissionConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmissionConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
