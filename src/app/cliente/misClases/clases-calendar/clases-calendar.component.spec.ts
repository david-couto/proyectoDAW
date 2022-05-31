import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasesCalendarComponent } from './clases-calendar.component';

describe('ClasesCalendarComponent', () => {
  let component: ClasesCalendarComponent;
  let fixture: ComponentFixture<ClasesCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClasesCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasesCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
