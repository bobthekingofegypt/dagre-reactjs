import { shallow } from 'enzyme';
import * as React from 'react';

import { Circle } from '../../src/shapes/Circle';
import { getDefaultNodeOptions } from '../stubs';

describe('Circle', () => {
  it('renders correctly', () => {
    const node = getDefaultNodeOptions('1', 'test label');
    const innerSize = { width: 50, height: 50 };
    const wrapper = shallow(<Circle node={node} innerSize={innerSize} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('sizes to the largest dimension', () => {
    const node = getDefaultNodeOptions('1', 'test label');
    const innerSize = { width: 100, height: 40 };
    const wrapper = shallow(<Circle node={node} innerSize={innerSize} />);
    const circle = wrapper.find('circle');
    expect(circle.prop('r')).toBe(50);
    expect(circle.prop('x')).toBe(-50);
    expect(circle.prop('y')).toBe(-20);
  });

  it('uses the custom stles when passed', () => {
    const node = getDefaultNodeOptions('1', '');
    node.styles.shape.styles = {
      fill: '#000',
    };
    const innerSize = { width: 50, height: 50 };
    const wrapper = shallow(<Circle node={node} innerSize={innerSize} />);

    const circle = wrapper.find('circle');
    expect(circle.prop('style')).toEqual(node.styles.shape.styles);
  });
});
