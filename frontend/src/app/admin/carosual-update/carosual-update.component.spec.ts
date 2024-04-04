import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarosualUpdateComponent } from './carosual-update.component';

describe('CarosualUpdateComponent', () => {
  let component: CarosualUpdateComponent;
  let fixture: ComponentFixture<CarosualUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarosualUpdateComponent]
    });
    fixture = TestBed.createComponent(CarosualUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
