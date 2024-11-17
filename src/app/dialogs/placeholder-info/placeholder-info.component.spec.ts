import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceholderInfoComponent } from './placeholder-info.component';

describe('PlaceholderInfoComponent', () => {
  let component: PlaceholderInfoComponent;
  let fixture: ComponentFixture<PlaceholderInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceholderInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaceholderInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
