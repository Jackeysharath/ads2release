import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeltemplatetypeComponent } from './seltemplatetype.component';

describe('SeltemplatetypeComponent', () => {
  let component: SeltemplatetypeComponent;
  let fixture: ComponentFixture<SeltemplatetypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeltemplatetypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeltemplatetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
