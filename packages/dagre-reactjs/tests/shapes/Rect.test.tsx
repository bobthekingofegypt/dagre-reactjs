import { shallow } from 'enzyme';
import * as React from 'react';

import { Rect } from '../../src/shapes/Rect';
import { getDefaultNodeOptions } from '../stubs';

describe('Rect', () => {
  it('renders correctly', () => {
    const node = getDefaultNodeOptions('1', 'test label');
    const innerSize = { width: 50, height: 50 };
    const wrapper = shallow(<Rect node={node} innerSize={innerSize} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('uses the custom stles when passed', () => {
    const node = getDefaultNodeOptions('1', '');
    node.styles.shape.styles = {
      fill: '#000',
    };
    const innerSize = { width: 50, height: 50 };
    const wrapper = shallow(<Rect node={node} innerSize={innerSize} />);

    const rect = wrapper.find('rect');
    expect(rect.prop('style')).toEqual(node.styles.shape.styles);
  });
});
