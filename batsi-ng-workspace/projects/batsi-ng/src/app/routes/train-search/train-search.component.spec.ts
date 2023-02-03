import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainSearchInputModule } from './components/train-search-input/train-search-input.module';

import { TrainSearchComponent } from './train-search.component';
import { NgxStateStackModule } from 'ngx-state-stack';

describe('TrainSearchComponent', () => {
  let component: TrainSearchComponent;
  let fixture: ComponentFixture<TrainSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainSearchComponent],
      imports: [
        TrainSearchInputModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NgxStateStackModule.forRoot()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TrainSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
