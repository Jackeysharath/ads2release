import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatselectedComponent } from './catselected.component';

describe('CatselectedComponent', () => {
  let component: CatselectedComponent;
  let fixture: ComponentFixture<CatselectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatselectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatselectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
