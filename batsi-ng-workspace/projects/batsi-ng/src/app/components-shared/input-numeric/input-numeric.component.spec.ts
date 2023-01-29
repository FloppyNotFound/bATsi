import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { InputNumericComponent } from './input-numeric.component';

describe('InputNumericComponent', () => {
  let component: InputNumericComponent;
  let fixture: ComponentFixture<InputNumericComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputNumericComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(InputNumericComponent);
    component = fixture.componentInstance;
    component.batsiFormControl = new FormControl();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
