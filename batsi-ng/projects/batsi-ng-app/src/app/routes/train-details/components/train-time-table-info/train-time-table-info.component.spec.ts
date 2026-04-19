import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimeTableInfo } from 'batsi-ng-models';
import { TrainTimeTableInfoComponent } from './train-time-table-info.component';

describe('TrainTimeTableInfoComponent', () => {
  let component: TrainTimeTableInfoComponent;
  let fixture: ComponentFixture<TrainTimeTableInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainTimeTableInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainTimeTableInfoComponent);
    fixture.componentRef.setInput('timeTableInfo', {} as TimeTableInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
