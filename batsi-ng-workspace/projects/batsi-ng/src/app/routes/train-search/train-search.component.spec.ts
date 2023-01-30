import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainSearchInputModule } from './components/train-search-input/train-search-input.module';

import { TrainSearchComponent } from './train-search.component';

describe('TrainSearchComponent', () => {
  let component: TrainSearchComponent;
  let fixture: ComponentFixture<TrainSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainSearchComponent],
      imports: [TrainSearchInputModule, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TrainSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
