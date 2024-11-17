import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailDispatchComponent } from './email-dispatch.component';

describe('EmailDispatchComponent', () => {
  let component: EmailDispatchComponent;
  let fixture: ComponentFixture<EmailDispatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailDispatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
