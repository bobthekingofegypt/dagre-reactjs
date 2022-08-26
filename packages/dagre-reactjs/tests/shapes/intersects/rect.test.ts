import { intersectRect } from '../../../src/shapes/intersects/rect';
import { getDefaultNodeOptions } from '../../stubs';

describe('rect intersets', () => {
  it('should match right intersection', () => {
    const node = getDefaultNodeOptions('1', 'test label');
    node.x = 25;
    node.y = 25;
    node.width = 50;
    node.height = 50;

    const point = { x: 55, y: 25 };

    const result = intersectRect(node, point);
    expect(result).toEqual({ x: 50, y: 25 });
  });

  it('should match bottom intersection', () => {
    const node = getDefaultNodeOptions('1', 'test label');
    node.x = 25;
    node.y = 25;
    node.width = 50;
    node.height = 50;

    const point = { x: 25, y: 50 };

    const result = intersectRect(node, point);
    expect(result).toEqual({ x: 25, y: 50 });
  });
});
