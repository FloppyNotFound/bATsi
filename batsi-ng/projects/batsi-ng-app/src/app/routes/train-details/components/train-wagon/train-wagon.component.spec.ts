import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainWagonComponent } from './train-wagon.component';
import { TrainWagonsInner } from 'batsi-ng-models';

describe('TrainWagonComponent', () => {
  let component: TrainWagonComponent;
  let fixture: ComponentFixture<TrainWagonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainWagonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainWagonComponent);
    fixture.componentRef.setInput('wagon', {} as TrainWagonsInner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
