import { shallow } from 'enzyme';
import * as React from 'react';

import { Diamond } from '../../src/shapes/Diamond';
import { getDefaultNodeOptions } from '../stubs';

describe('Diamond', () => {
  it('renders correctly', () => {
    const node = getDefaultNodeOptions('1', 'test label');
    const innerSize = { width: 50, height: 50 };
    const wrapper = shallow(<Diamond node={node} innerSize={innerSize} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('uses the custom stles when passed', () => {
    const node = getDefaultNodeOptions('1', '');
    node.styles.shape.styles = {
      fill: '#000',
    };
    const innerSize = { width: 50, height: 50 };
    const wrapper = shallow(<Diamond node={node} innerSize={innerSize} />);

    const polygon = wrapper.find('polygon');
    expect(polygon.prop('style')).toEqual(node.styles.shape.styles);
  });
});
