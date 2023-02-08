import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsSharedModule } from '../../../../components-shared/components-shared.module';
import { ButtonWithSpinnerComponent } from './components/button-with-spinner/button-with-spinner.component';
import { TrainSearchInputComponent } from './train-search-input.component';
import { StationNamesPipe } from './pipes/station-names.pipe';

describe('TrainSearchInputComponent', () => {
  let component: TrainSearchInputComponent;
  let fixture: ComponentFixture<TrainSearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TrainSearchInputComponent,
        ButtonWithSpinnerComponent,
        StationNamesPipe
      ],
      imports: [
        ComponentsSharedModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
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
