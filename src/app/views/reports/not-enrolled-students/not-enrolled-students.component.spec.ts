import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotEnrolledStudentsComponent } from './not-enrolled-students.component';

describe('NotEnrolledStudentsComponent', () => {
  let component: NotEnrolledStudentsComponent;
  let fixture: ComponentFixture<NotEnrolledStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotEnrolledStudentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotEnrolledStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
