import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddCartComponent } from './addd-cart.component';

describe('AdddCartComponent', () => {
  let component: AdddCartComponent;
  let fixture: ComponentFixture<AdddCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdddCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdddCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
