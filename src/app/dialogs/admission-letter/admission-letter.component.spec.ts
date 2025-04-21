import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionLetterComponent } from './admission-letter.component';

describe('AdmissionLetterComponent', () => {
  let component: AdmissionLetterComponent;
  let fixture: ComponentFixture<AdmissionLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmissionLetterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmissionLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
