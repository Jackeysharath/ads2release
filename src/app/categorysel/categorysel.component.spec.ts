import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryselComponent } from './categorysel.component';

describe('CategoryselComponent', () => {
  let component: CategoryselComponent;
  let fixture: ComponentFixture<CategoryselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
