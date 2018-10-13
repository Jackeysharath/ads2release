import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeltemplateComponent } from './seltemplate.component';

describe('SeltemplateComponent', () => {
  let component: SeltemplateComponent;
  let fixture: ComponentFixture<SeltemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeltemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeltemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
