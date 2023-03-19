import { TimeTableInfoTimeScheduled } from 'batsi-models';
import { ToTimeStringPipe } from './to-time-string.pipe';

describe('ToTimeStringPipe', () => {
  const pipe = new ToTimeStringPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('adds a zero to hours and minutes if zero', () => {
    // Assign
    const hours = 0;
    const minutes = 0;
    const time: TimeTableInfoTimeScheduled = {
      days: 0,
      hours,
      minutes
    };

    // Act
    const result = pipe.transform(time);

    // Assert
    expect(result).toBe('00:00h');
  });

  it('adds a zero to hours and minutes if 9', () => {
    // Assign
    const hours = 9;
    const minutes = 9;
    const time: TimeTableInfoTimeScheduled = {
      days: 0,
      hours,
      minutes
    };

    // Act
    const result = pipe.transform(time);

    // Assert
    expect(result).toBe('09:09h');
  });

  it('adds no zero to hours and minutes if 10', () => {
    // Assign
    const hours = 10;
    const minutes = 10;
    const time: TimeTableInfoTimeScheduled = {
      days: 0,
      hours,
      minutes
    };

    // Act
    const result = pipe.transform(time);

    // Assert
    expect(result).toBe('10:10h');
  });
});
