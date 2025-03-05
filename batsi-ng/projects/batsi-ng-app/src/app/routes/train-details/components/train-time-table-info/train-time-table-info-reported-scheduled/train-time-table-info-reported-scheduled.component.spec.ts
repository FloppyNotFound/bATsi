import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainTimeTableInfoReportedScheduledComponent } from './train-time-table-info-reported-scheduled.component';

describe('TrainTimeTableInfoReportedScheduledComponent', () => {
  let component: TrainTimeTableInfoReportedScheduledComponent;
  let fixture: ComponentFixture<TrainTimeTableInfoReportedScheduledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainTimeTableInfoReportedScheduledComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainTimeTableInfoReportedScheduledComponent);
    fixture.componentRef.setInput('reported', void 0);
    fixture.componentRef.setInput('scheduled', void 0);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
