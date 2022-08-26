import { generatePath } from '../../src/paths/normal';

test('basic points array generates correct path', () => {
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
