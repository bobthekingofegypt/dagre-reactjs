import { shallow } from 'enzyme';
import * as React from 'react';

import { Text } from '../../src/nodelabels/Text';
import { getDefaultNodeOptions } from '../stubs';

describe('Text', () => {
  it('renders correctly', () => {
    const node = getDefaultNodeOptions('1', 'test label');
    const wrapper = shallow(<Text node={node} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the given label', () => {
    const node = getDefaultNodeOptions('1', 'test label');
    const wrapper = shallow(<Text node={node} />);
    const tspanElement = wrapper.find('tspan');
    expect(tspanElement.text()).toBe('test label');
  });

  it('renders the empty string label when empty label passed', () => {
    const node = getDefaultNodeOptions('1', '');
    const wrapper = shallow(<Text node={node} />);
    const tspanElement = wrapper.find('tspan');
    expect(tspanElement.text()).toBe('');
  });

  it('uses the custom css classname when passed', () => {
    const node = getDefaultNodeOptions('1', '');
    node.styles.label.className = 'test-classname';
    const wrapper = shallow(<Text node={node} />);

    const text = wrapper.find('text');
    expect(text.hasClass('test-classname')).toBe(true);
  });
});
