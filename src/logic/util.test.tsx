import { dayDiff } from './util';

test('correctly calculates day difference', () => {
  const a = new Date('2017-01-01'),
    b = new Date('2017-07-25'),
    difference = dayDiff(a, b);
  expect(difference).toBe(205);
});
