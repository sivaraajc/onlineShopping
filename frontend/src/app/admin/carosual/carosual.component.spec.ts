import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarosualComponent } from './carosual.component';

describe('CarosualComponent', () => {
  let component: CarosualComponent;
  let fixture: ComponentFixture<CarosualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarosualComponent]
    });
    fixture = TestBed.createComponent(CarosualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
