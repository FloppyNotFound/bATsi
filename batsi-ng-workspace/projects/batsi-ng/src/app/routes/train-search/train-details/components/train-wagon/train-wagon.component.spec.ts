import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainWagonComponent } from './train-wagon.component';

describe('TrainWagonComponent', () => {
  let component: TrainWagonComponent;
  let fixture: ComponentFixture<TrainWagonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainWagonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TrainWagonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
