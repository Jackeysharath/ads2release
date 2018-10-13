import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsummaryComponent } from './bookingsummary.component';

describe('BookingsummaryComponent', () => {
  let component: BookingsummaryComponent;
  let fixture: ComponentFixture<BookingsummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingsummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
