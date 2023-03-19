import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainTimeTableInfoReportedScheduledComponent } from './train-time-table-info-reported-scheduled.component';

describe('TrainTimeTableInfoReportedScheduledComponent', () => {
  let component: TrainTimeTableInfoReportedScheduledComponent;
  let fixture: ComponentFixture<TrainTimeTableInfoReportedScheduledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainTimeTableInfoReportedScheduledComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(
      TrainTimeTableInfoReportedScheduledComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
