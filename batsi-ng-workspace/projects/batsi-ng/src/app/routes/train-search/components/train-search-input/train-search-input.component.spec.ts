import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsSharedModule } from '../../../../components-shared/components-shared.module';
import { ButtonWithSpinnerComponent } from './components/button-with-spinner/button-with-spinner.component';
import { TrainSearchInputComponent } from './train-search-input.component';

describe('TrainSearchInputComponent', () => {
  let component: TrainSearchInputComponent;
  let fixture: ComponentFixture<TrainSearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainSearchInputComponent, ButtonWithSpinnerComponent],
      imports: [
        ComponentsSharedModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TrainSearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
