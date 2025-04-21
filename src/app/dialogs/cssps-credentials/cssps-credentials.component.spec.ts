import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsspsCredentialsComponent } from './cssps-credentials.component';

describe('CsspsCredentialsComponent', () => {
  let component: CsspsCredentialsComponent;
  let fixture: ComponentFixture<CsspsCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsspsCredentialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsspsCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
