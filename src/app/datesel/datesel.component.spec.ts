import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateselComponent } from './datesel.component';

describe('DateselComponent', () => {
  let component: DateselComponent;
  let fixture: ComponentFixture<DateselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
