import { describe, it, expect } from 'vitest';
import {
  calculateVerticalRate,
  calculateDescentPointUsing3To1Rule,
} from '../src/index';

describe('calculateVerticalRate', () => {
  it('should calculate correct descent rate', () => {
    expect(
      calculateVerticalRate({
        currentAltitude: 10000,
        targetAltitude: 2000,
        groundSpeed: 180,
        distance: 30,
      }),
    ).toBe(-800);
  });

  it('should calculate correct climb rate', () => {
    expect(
      calculateVerticalRate({
        currentAltitude: 2000,
        targetAltitude: 10000,
        groundSpeed: 150,
        distance: 25,
      }),
    ).toBe(800);
  });

  it('should throw an error for zero distance', () => {
    expect(() =>
      calculateVerticalRate({
        currentAltitude: 5000,
        targetAltitude: 10000,
        groundSpeed: 200,
        distance: 0,
      }),
    ).toThrowError();
  });

  it('should throw an error for zero ground speed', () => {
    expect(() =>
      calculateVerticalRate({
        currentAltitude: 5000,
        targetAltitude: 10000,
        groundSpeed: 0,
        distance: 20,
      }),
    ).toThrowError();
  });
});

describe('calculateDescentPointUsing3To1Rule', () => {
  it('should calculate correct descent distance', () => {
    expect(
      calculateDescentPointUsing3To1Rule({
        currentAltitude: 10000,
        targetAltitude: 2000,
      }),
    ).toBe(24);
  });

  it('should throw an error if current altitude is not greater than target altitude', () => {
    expect(() =>
      calculateDescentPointUsing3To1Rule({
        currentAltitude: 2000,
        targetAltitude: 2000,
      }),
    ).toThrowError();
  });
});
