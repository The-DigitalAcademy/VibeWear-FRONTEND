import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutPopUpComponent } from './check-out-pop-up.component';

describe('CheckOutPopUpComponent', () => {
  let component: CheckOutPopUpComponent;
  let fixture: ComponentFixture<CheckOutPopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckOutPopUpComponent]
    });
    fixture = TestBed.createComponent(CheckOutPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
