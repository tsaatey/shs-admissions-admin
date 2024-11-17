import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualAdmissionComponent } from './manual-admission.component';

describe('ManualAdmissionComponent', () => {
  let component: ManualAdmissionComponent;
  let fixture: ComponentFixture<ManualAdmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManualAdmissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualAdmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
