import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPlacedStudentsComponent } from './all-placed-students.component';

describe('AllPlacedStudentsComponent', () => {
  let component: AllPlacedStudentsComponent;
  let fixture: ComponentFixture<AllPlacedStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllPlacedStudentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPlacedStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
