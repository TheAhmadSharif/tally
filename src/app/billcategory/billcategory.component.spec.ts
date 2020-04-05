import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillcategoryComponent } from './billcategory.component';

describe('BillcategoryComponent', () => {
  let component: BillcategoryComponent;
  let fixture: ComponentFixture<BillcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
