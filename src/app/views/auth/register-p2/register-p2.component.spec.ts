import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterP2Component } from './register-p2.component';

describe('RegisterP2Component', () => {
  let component: RegisterP2Component;
  let fixture: ComponentFixture<RegisterP2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterP2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterP2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
