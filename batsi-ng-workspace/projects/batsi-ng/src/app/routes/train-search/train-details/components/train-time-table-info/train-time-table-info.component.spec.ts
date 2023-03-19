import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainTimeTableInfoComponent } from './train-time-table-info.component';

describe('TrainTimeTableInfoComponent', () => {
  let component: TrainTimeTableInfoComponent;
  let fixture: ComponentFixture<TrainTimeTableInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainTimeTableInfoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TrainTimeTableInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
