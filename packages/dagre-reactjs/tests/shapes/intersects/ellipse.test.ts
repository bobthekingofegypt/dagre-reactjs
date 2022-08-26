import { intersectEllipse } from '../../../src/shapes/intersects/ellipse';
import { getDefaultNodeOptions } from '../../stubs';

describe('ellipse intersets', () => {
  it('should match right intersection', () => {
    const node = getDefaultNodeOptions('1', 'test label');
    node.x = 25;
    node.y = 25;
    node.width = 50;
    node.height = 50;

    const point = { x: 55, y: 25 };

    const result = intersectEllipse(node, point);
    expect(result).toEqual({ x: 50, y: 25 });
  });

  it('should match bottom intersection', () => {
    const node = getDefaultNodeOptions('1', 'test label');
    node.x = 25;
    node.y = 25;
    node.width = 50;
    node.height = 50;

    const point = { x: 25, y: 55 };

    const result = intersectEllipse(node, point);
    expect(result).toEqual({ x: 25, y: 50 });
  });

  it('should match bottom right intersection', () => {
    const node = getDefaultNodeOptions('1', 'test label');
    node.x = 25;
    node.y = 25;
    node.width = 50;
    node.height = 50;

    const point = { x: 75, y: 75 };

    const result = intersectEllipse(node, point);
    expect(result.x).toBeCloseTo(42.677, 2);
    expect(result.y).toBeCloseTo(42.677, 2);
  });
});
