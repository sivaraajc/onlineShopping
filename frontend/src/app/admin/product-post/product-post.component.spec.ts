import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPostComponent } from './product-post.component';

describe('ProductPostComponent', () => {
  let component: ProductPostComponent;
  let fixture: ComponentFixture<ProductPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductPostComponent]
    });
    fixture = TestBed.createComponent(ProductPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
