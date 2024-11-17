import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolConfigComponent } from './school-config.component';

describe('SchoolConfigComponent', () => {
  let component: SchoolConfigComponent;
  let fixture: ComponentFixture<SchoolConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
