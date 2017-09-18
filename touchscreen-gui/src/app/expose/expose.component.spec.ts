import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExposeComponent } from './expose.component';

describe('ExposeComponent', () => {
  let component: ExposeComponent;
  let fixture: ComponentFixture<ExposeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExposeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
