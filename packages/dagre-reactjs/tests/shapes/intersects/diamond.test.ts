import { intersectDiamond } from '../../../src/shapes/intersects/diamond';
import { getDefaultNodeOptions } from '../../stubs';

describe('diamond intersets', () => {
  it('should match right intersection', () => {
    const node = getDefaultNodeOptions('1', 'test label');
    node.x = 25;
    node.y = 25;
    node.width = 50;
    node.height = 50;

    const point = { x: 55, y: 25 };

    const result = intersectDiamond(node, point);
    expect(result).toEqual({ x: 50.5, y: 25.5 });
  });

  it('should match bottom intersection', () => {
    const node = getDefaultNodeOptions('1', 'test label');
    node.x = 25;
    node.y = 25;
    node.width = 50;
    node.height = 50;

    const point = { x: 25, y: 50 };

    const result = intersectDiamond(node, point);
    expect(result).toEqual({ x: 25.5, y: 50.5 });
  });

  it('should match angle intersection', () => {
    const node = getDefaultNodeOptions('1', 'test label');
    node.x = 25;
    node.y = 25;
    node.width = 50;
    node.height = 50;

    const point = { x: 50, y: 50 };

    const result = intersectDiamond(node, point);
    expect(result).toEqual({ x: 38, y: 38 });
  });
});
