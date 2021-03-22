import { generatePath } from '../../src/paths/normal';

test('adds 1 + 2 to equal 3', () => {
  const points = [
    {
      x: 1,
      y: 2,
    },
    {
      x: 3,
      y: 4,
    },
  ];
  expect(generatePath(points)).toBe('M1,2L3,4');
});
