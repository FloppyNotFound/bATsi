import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainSearchInputComponent } from './train-search-input.component';

describe('TrainSearchInputComponent', () => {
  let component: TrainSearchInputComponent;
  let fixture: ComponentFixture<TrainSearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainSearchInputComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TrainSearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
