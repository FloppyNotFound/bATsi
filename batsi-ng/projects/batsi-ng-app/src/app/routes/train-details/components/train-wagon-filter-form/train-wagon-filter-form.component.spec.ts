import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TrainWagonFilterFormComponent } from './train-wagon-filter-form.component';

describe('TrainWagonFilterFormComponent', () => {
  let component: TrainWagonFilterFormComponent;
  let fixture: ComponentFixture<TrainWagonFilterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TrainWagonFilterFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainWagonFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
