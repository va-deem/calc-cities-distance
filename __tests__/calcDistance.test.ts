// @ts-nocheck
import calcDistance from '../src/services/calcDistance';

describe('calculating the distance between two cities', () => {
  test('returns object with 3 fields', () => {
    const received = calcDistance(
      ['Nantes', 47.218371, -1.553621],
      ['Toulon', 43.124228, 5.928]
    );
    expect(received).resolves.toHaveProperty('from');
    expect(received).resolves.toHaveProperty('to');
    expect(received).resolves.toHaveProperty('distance');
  });

  test('return zero when arguments are equal', () => {
    const received = calcDistance(
      ['Nantes', 47.218371, -1.553621],
      ['Nantes', 47.218371, -1.553621]
    );
    expect(received).resolves.toStrictEqual({
      to: 'Nantes',
      from: 'Nantes',
      distance: 0,
    });
  });

  test('return the correct result with given args', () => {
    const received = calcDistance(['SomeCity', 50, 30], ['SomeCity', 60, 40]);
    expect(received).resolves.toStrictEqual({
      to: 'SomeCity',
      from: 'SomeCity',
      distance: 1279,
    });
  });

  test('throw an arrow if some arguments wrong of missed', () => {
    const received1 = calcDistance(undefined, ['SomeCity', 60, 40]);
    const received2 = calcDistance();
    const received3 = calcDistance(['SomeCity', 60, 40]);
    const received4 = calcDistance(undefined, undefined);
    expect(received1).rejects.toThrowError('Wrong or no params given');
    expect(received2).rejects.toThrowError('Wrong or no params given');
    expect(received3).rejects.toThrowError('Wrong or no params given');
    expect(received4).rejects.toThrowError('Wrong or no params given');
  });
});
