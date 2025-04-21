import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostOfVoucherComponent } from './cost-of-voucher.component';

describe('CostOfVoucherComponent', () => {
  let component: CostOfVoucherComponent;
  let fixture: ComponentFixture<CostOfVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostOfVoucherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostOfVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
