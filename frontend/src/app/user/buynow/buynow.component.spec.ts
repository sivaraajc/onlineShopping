import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuynowComponent } from './buynow.component';

describe('BuynowComponent', () => {
  let component: BuynowComponent;
  let fixture: ComponentFixture<BuynowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuynowComponent]
    });
    fixture = TestBed.createComponent(BuynowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
